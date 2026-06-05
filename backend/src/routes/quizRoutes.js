const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', protect, admin, quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.put('/:id', protect, admin, quizController.updateQuiz);
router.delete('/:id', protect, admin, quizController.deleteQuiz);
router.post('/:id/submit', protect, quizController.submitQuizAttempt);
router.get('/user/attempts', protect, quizController.getUserQuizAttempts);

module.exports = router;
