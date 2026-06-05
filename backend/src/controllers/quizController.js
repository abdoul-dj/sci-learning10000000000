const quizService = require('../services/quizService');

const createQuiz = async (req, res) => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizService.getAllQuizzes(req.query);
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quiz = await quizService.updateQuiz(req.params.id, req.body);
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const result = await quizService.deleteQuiz(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitQuizAttempt = async (req, res) => {
  try {
    const attempt = await quizService.submitQuizAttempt(
      req.user.id,
      req.params.id,
      req.body.answers
    );
    res.json(attempt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserQuizAttempts = async (req, res) => {
  try {
    const attempts = await quizService.getUserQuizAttempts(req.user.id, req.query.quizId);
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt,
  getUserQuizAttempts,
};
