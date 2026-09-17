import mongoose from "mongoose";

export const isValidId = (id) => {
  if (id == null || id === "") return false;
  const value = String(id);
  return mongoose.Types.ObjectId.isValid(value) && /^[a-fA-F0-9]{24}$/.test(value);
};

export const idOf = (value) => {
  if (value == null) return null;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value._id != null) return String(value._id);
  if (value.id != null && typeof value.id !== "object") return String(value.id);
  return null;
};

export const serializeUser = (user) => {
  if (!user) return null;
  const fullName = user.full_name || user.name || "";
  return {
    id: idOf(user),
    full_name: fullName,
    name: fullName,
    email: user.email || "",
    role: user.role || "student",
    is_active: user.is_active !== false,
    created_at: user.createdAt || user.created_at || null,
  };
};

export const serializeCategory = (category) => {
  if (!category) return null;
  return {
    id: idOf(category),
    name: category.name,
    description: category.description || "",
    created_at: category.createdAt || category.created_at,
  };
};

const populatedName = (ref) => {
  if (!ref) return null;
  if (typeof ref === "object" && ref.name) return ref.name;
  return null;
};

export const serializeLesson = (lesson) => {
  if (!lesson) return null;
  return {
    id: idOf(lesson),
    title: lesson.title,
    description: lesson.description,
    category_id: idOf(lesson.category),
    category: populatedName(lesson.category),
    content: lesson.content,
    image_url: lesson.image_url || null,
    created_at: lesson.createdAt,
    updated_at: lesson.updatedAt,
  };
};

export const serializeOption = (option, includeAnswers) => {
  const data = {
    id: idOf(option),
    option_text: option.option_text,
  };
  if (includeAnswers) data.is_correct = Boolean(option.is_correct);
  return data;
};

export const serializeQuestion = (question, includeAnswers) => ({
  id: idOf(question),
  question_text: question.question_text,
  explanation: includeAnswers ? question.explanation || null : undefined,
  order_index: question.order_index ?? 0,
  options: (question.options || []).map((opt) =>
    serializeOption(opt, includeAnswers)
  ),
});

export const serializeQuiz = (quiz, includeAnswers = false) => {
  if (!quiz) return null;
  const questions = quiz.questions || [];
  return {
    id: idOf(quiz),
    title: quiz.title,
    description: quiz.description,
    category_id: idOf(quiz.category),
    category: populatedName(quiz.category),
    difficulty: quiz.difficulty,
    duration_minutes: quiz.duration_minutes,
    question_count: questions.length,
    questions: questions.map((q) => serializeQuestion(q, includeAnswers)),
    created_at: quiz.createdAt,
    updated_at: quiz.updatedAt,
  };
};

export const serializeTip = (tip) => {
  if (!tip) return null;
  return {
    id: idOf(tip),
    title: tip.title,
    content: tip.content,
    category_id: idOf(tip.category),
    category: populatedName(tip.category),
    read_time: tip.read_time,
    created_at: tip.createdAt,
    updated_at: tip.updatedAt,
  };
};

export const serializeQuizResult = (result) => {
  if (!result) return null;
  return {
    id: idOf(result),
    user_id: idOf(result.user),
    quiz_id: idOf(result.quiz),
    quiz_title: result.quiz?.title || result.quiz_title,
    category: result.quiz?.category?.name || result.category,
    score: result.score,
    total_questions: result.total_questions,
    total: result.total_questions,
    percentage: result.percentage,
    answers: result.answers,
    created_at: result.createdAt,
  };
};

export const serializeCertificateRequest = (request) => {
  if (!request) return null;
  return {
    id: idOf(request),
    user_id: idOf(request.user),
    lesson_id: request.lesson ? idOf(request.lesson) : null,
    quiz_id: request.quiz ? idOf(request.quiz) : null,
    status: request.status,
    submitted_marks: request.submitted_marks,
    verified_score: request.verified_score,
    admin_notes: request.admin_notes,
    full_name: request.user?.full_name,
    email: request.user?.email,
    lesson_title: request.lesson?.title || null,
    quiz_title: request.quiz?.title || null,
    created_at: request.createdAt,
    updated_at: request.updatedAt,
  };
};

export const serializeCertificate = (cert) => {
  if (!cert) return null;
  return {
    id: idOf(cert),
    request_id: idOf(cert.request),
    user_id: idOf(cert.user),
    certificate_number: cert.certificate_number,
    title: cert.title,
    issued_at: cert.issuedAt || cert.createdAt,
    certificate_data: cert.certificate_data,
    full_name: cert.user?.full_name,
    email: cert.user?.email,
    request_status: cert.request?.status,
  };
};
