import * as certificateService from "../services/certificateService.js";

export const createRequest = async (req, res) => {
  try {
    const request = await certificateService.createCertificateRequest(
      req.user.id,
      req.body
    );
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await certificateService.getUserRequests(req.user.id);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await certificateService.getUserCertificates(
      req.user.id
    );
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const cert = await certificateService.getCertificateById(req.params.id);
    if (!cert) return res.status(404).json({ message: "Certificate not found" });
    const isOwner = String(cert.user_id) === String(req.user.id);
    if (!isOwner && req.user.role !== "admin") {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.json(cert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await certificateService.getAllRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approve = async (req, res) => {
  try {
    const result = await certificateService.approveRequest(
      req.params.id,
      req.body.admin_notes
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const reject = async (req, res) => {
  try {
    const request = await certificateService.rejectRequest(
      req.params.id,
      req.body.admin_notes
    );
    res.json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await certificateService.getAllCertificates();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const checkEligibility = async (req, res) => {
  try {
    const request = await certificateService.getRequestById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    const eligibility = certificateService.verifyEligibility(request);
    res.json(eligibility);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
