import QuizResult from "../models/QuizResult.js";
import CertificateRequest from "../models/CertificateRequest.js";
import Certificate from "../models/Certificate.js";
import {
  isValidId,
  serializeCertificateRequest,
  serializeCertificate,
} from "../utils/mongo.js";

const MIN_SCORE = 80;

const requestPopulate = [
  { path: "user", select: "full_name email" },
  { path: "lesson", select: "title" },
  { path: "quiz", select: "title" },
];

export const createCertificateRequest = async (userId, data) => {
  if (!data.quiz_id || !isValidId(data.quiz_id)) {
    throw new Error("Select a quiz you have completed");
  }

  const best = await QuizResult.findOne({
    user: userId,
    quiz: data.quiz_id,
  }).sort({ percentage: -1 });

  if (!best) {
    throw new Error("No verified quiz result found. Complete the quiz first.");
  }

  const verifiedScore = Number(best.percentage);

  const created = await CertificateRequest.create({
    user: userId,
    lesson: data.lesson_id && isValidId(data.lesson_id) ? data.lesson_id : null,
    quiz: data.quiz_id,
    status: "Pending",
    submitted_marks:
      data.submitted_marks === undefined || data.submitted_marks === null || data.submitted_marks === ""
        ? null
        : Number(data.submitted_marks),
    verified_score: verifiedScore,
  });

  return getRequestById(created._id);
};

export const getRequestById = async (id) => {
  if (!isValidId(id)) return null;
  const request = await CertificateRequest.findById(id).populate(requestPopulate);
  return serializeCertificateRequest(request);
};

export const getUserRequests = async (userId) => {
  const requests = await CertificateRequest.find({ user: userId })
    .populate(requestPopulate)
    .sort({ createdAt: -1 });
  return requests.map(serializeCertificateRequest);
};

export const getAllRequests = async () => {
  const requests = await CertificateRequest.find()
    .populate(requestPopulate)
    .sort({ createdAt: -1 });
  return requests.map(serializeCertificateRequest);
};

export const verifyEligibility = (request) => {
  if (request.verified_score === null || request.verified_score === undefined) {
    return { eligible: false, reason: "No verified quiz results found" };
  }
  if (parseFloat(request.verified_score) < MIN_SCORE) {
    return {
      eligible: false,
      reason: `Score ${request.verified_score}% is below the minimum required ${MIN_SCORE}%`,
    };
  }
  return { eligible: true, score: parseFloat(request.verified_score) };
};

export const approveRequest = async (id, adminNotes) => {
  const request = await getRequestById(id);
  if (!request) throw new Error("Request not found");
  if (request.status !== "Pending") throw new Error("Request already processed");

  const eligibility = verifyEligibility(request);
  if (!eligibility.eligible) {
    throw new Error(eligibility.reason);
  }

  await CertificateRequest.findByIdAndUpdate(id, {
    status: "Approved",
    admin_notes: adminNotes || null,
    verified_score: eligibility.score,
  });

  const certNumber = `CERT-${Date.now()}-${request.user_id}`;
  const title =
    request.quiz_title || request.lesson_title || "Science Learning Certificate";

  const created = await Certificate.create({
    request: id,
    user: request.user_id,
    certificate_number: certNumber,
    title,
    issuedAt: new Date(),
    certificate_data: {
      studentName: request.full_name,
      title,
      score: eligibility.score,
      issuedDate: new Date().toISOString(),
    },
  });

  return {
    request: await getRequestById(id),
    certificate: await getCertificateById(created._id),
  };
};

export const rejectRequest = async (id, adminNotes) => {
  const request = await getRequestById(id);
  if (!request) throw new Error("Request not found");
  if (request.status !== "Pending") throw new Error("Request already processed");

  await CertificateRequest.findByIdAndUpdate(id, {
    status: "Rejected",
    admin_notes: adminNotes || "Does not meet requirements",
  });

  return getRequestById(id);
};

export const getCertificateById = async (id) => {
  if (!isValidId(id)) return null;
  const cert = await Certificate.findById(id)
    .populate("user", "full_name email")
    .populate("request");
  return serializeCertificate(cert);
};

export const getUserCertificates = async (userId) => {
  const certs = await Certificate.find({ user: userId })
    .populate("user", "full_name email")
    .populate("request")
    .sort({ issuedAt: -1 });
  return certs.map(serializeCertificate);
};

export const getAllCertificates = async () => {
  const certs = await Certificate.find()
    .populate("user", "full_name email")
    .populate("request")
    .sort({ issuedAt: -1 });
  return certs.map(serializeCertificate);
};
