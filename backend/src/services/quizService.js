import Quiz from "../models/Quiz.js";
import QuizResult from "../models/QuizResult.js";
import Category from "../models/Category.js";
import {
  isValidId,
  idOf,
  serializeQuiz,
  serializeQuizResult,
} from "../utils/mongo.js";

const mapQuestions = (questions = []) =>
  questions.map((q, i) => ({
    question_text: q.question_text,
    explanation: q.explanation || "",
    order_index: i,
    options: (q.options || []).map((opt) => ({
      option_text: opt.option_text,
      is_correct: Boolean(opt.is_correct),
    })),
  }));

export const getAllQuizzes = async ({ category, difficulty } = {}) => {
  const filter = {};
  if (category) {
    const cat = await Category.findOne({ name: category });
    if (!cat) return [];
    filter.category = cat._id;
  }
  if (difficulty) filter.difficulty = difficulty;

  const quizzes = await Quiz.find(filter)
    .populate("category")
    .sort({ createdAt: -1 });

  return quizzes.map((quiz) => {
    const serialized = serializeQuiz(quiz, false);
    delete serialized.questions;
    return serialized;
  });
};

export const getQuizById = async (id, includeAnswers = false) => {
  if (!isValidId(id)) return null;
  const quiz = await Quiz.findById(id).populate("category");
  if (!quiz) return null;
  const serialized = serializeQuiz(quiz, includeAnswers);
  if (!includeAnswers) {
    serialized.questions = serialized.questions.map((q) => {
      const { explanation, ...rest } = q;
      return rest;
    });
  }
  return serialized;
};

export const createQuiz = async (data) => {
  let categoryRef = null;
  if (isValidId(data.category_id)) {
    categoryRef = data.category_id;
  } else if (data.category) {
    const found = await Category.findOne({ name: data.category });
    if (!found) throw new Error("Valid category is required");
    categoryRef = found._id;
  } else {
    throw new Error("Valid category is required");
  }
  const created = await Quiz.create({
    title: data.title,
    description: data.description,
    category: categoryRef,
    difficulty: data.difficulty || "Easy",
    pass_percentage: data.pass_percentage || 80,
    duration_minutes: data.duration_minutes || 30,
    questions: mapQuestions(data.questions),
  });
  return getQuizById(created._id, true);
};

export const updateQuiz = async (id, data) => {
  if (!isValidId(id)) return null;
  const update = {
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    pass_percentage: data.pass_percentage,
    duration_minutes: data.duration_minutes,
  };
  if (isValidId(data.category_id)) {
    update.category = data.category_id;
  } else if (data.category) {
    const found = await Category.findOne({ name: data.category });
    if (found) update.category = found._id;
  }
  if (data.questions) {
    update.questions = mapQuestions(data.questions);
  }
  const updated = await Quiz.findByIdAndUpdate(id, update, {
    new: true, runValidators: true,
  });
  if (!updated) return null;
  return getQuizById(id, true);
};

export const deleteQuiz = async (id) => {
  if (!isValidId(id)) return false;
  const deleted = await Quiz.findByIdAndDelete(id);
  return Boolean(deleted);
};

export const submitQuiz = async (userId, quizId, answers) => {
  const quiz = await getQuizById(quizId, true);
  if (!quiz) throw new Error("Quiz not found");

  let score = 0;
  const total = quiz.questions.length;
  const gradedAnswers = [];

  for (const question of quiz.questions) {
    const userAnswer = (answers || []).find(
      (a) => String(a.questionId) === String(question.id)
    );
    const correctOption = question.options.find((o) => o.is_correct);
    const isCorrect =
      Boolean(userAnswer) &&
      Boolean(correctOption) &&
      String(userAnswer.optionId) === String(correctOption.id);
    if (isCorrect) score++;
    gradedAnswers.push({
      questionId: question.id,
      optionId: userAnswer?.optionId || null,
      correct: isCorrect,
    });
  }

  const percentage = total > 0 ? Math.round((score / total) * 10000) / 100 : 0;

  const created = await QuizResult.create({
    user: userId,
    quiz: quizId,
    score,
    total_questions: total,
    percentage,
    answers: gradedAnswers,
  });

  return {
    id: idOf(created),
    score,
    total,
    percentage,
    answers: gradedAnswers,
    feedback: getPerformanceFeedback(percentage),
  };
};

const getPerformanceFeedback = (percentage) => {
  if (percentage >= 90) return "Excellent! Outstanding performance!";
  if (percentage >= 80) return "Great job! You have a strong understanding.";
  if (percentage >= 60) return "Good effort! Keep practicing to improve.";
  if (percentage >= 40) return "Fair attempt. Review the material and try again.";
  return "Keep learning! Review the lessons and attempt the quiz again.";
};

export const getUserQuizResults = async (userId) => {
  const results = await QuizResult.find({ user: userId })
    .populate({
      path: "quiz",
      populate: { path: "category" },
    })
    .sort({ createdAt: -1 });
  return results.map(serializeQuizResult);
};

export const getQuizResultById = async (id, userId, isAdmin = false) => {
  if (!isValidId(id)) return null;
  const filter = isAdmin ? { _id: id } : { _id: id, user: userId };
  const result = await QuizResult.findOne(filter).populate("quiz");
  return serializeQuizResult(result);
};

export const getAllQuizResults = async () => {
  const results = await QuizResult.find()
    .populate({
      path: "quiz",
      populate: { path: "category" },
    })
    .populate("user", "full_name email")
    .sort({ createdAt: -1 })
    .limit(200);

  return results.map((result) => ({
    ...serializeQuizResult(result),
    full_name: result.user?.full_name,
    email: result.user?.email,
  }));
};
