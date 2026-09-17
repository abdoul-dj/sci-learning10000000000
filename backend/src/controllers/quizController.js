import * as quizService from "../services/quizService.js";

export const getAll = async (req, res) => {
  try {
    const quizzes = await quizService.getAllQuizzes({
      category: req.query.category,
      difficulty: req.query.difficulty,
    });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id, false);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOneAdmin = async (req, res) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id, true);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const quiz = await quizService.updateQuiz(req.params.id, req.body);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await quizService.deleteQuiz(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Quiz not found" });
    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submit = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers?.length) {
      return res.status(400).json({ message: "Answers are required" });
    }
    const result = await quizService.submitQuiz(
      req.user.id,
      req.params.id,
      answers
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMyResults = async (req, res) => {
  try {
    const results = await quizService.getUserQuizResults(req.user.id);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getResult = async (req, res) => {
  try {
    const result = await quizService.getQuizResultById(
      req.params.resultId,
      req.user.id,
      req.user.role === "admin"
    );
    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await quizService.getAllQuizResults();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
