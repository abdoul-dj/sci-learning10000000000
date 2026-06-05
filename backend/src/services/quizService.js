const prisma = require('../config/db');

const createQuiz = async (quizData) => {
  const { questions, ...quizInfo } = quizData;
  
  const quiz = await prisma.quiz.create({
    data: {
      ...quizInfo,
      questions: {
        create: questions,
      },
    },
    include: {
      questions: true,
    },
  });
  return quiz;
};

const getAllQuizzes = async (filters = {}) => {
  const { published } = filters;
  
  const where = {};
  if (published !== undefined) where.published = published === 'true';

  const quizzes = await prisma.quiz.findMany({
    where,
    include: {
      questions: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return quizzes;
};

const getQuizById = async (id) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: 'asc' },
      },
    },
  });
  return quiz;
};

const updateQuiz = async (id, updateData) => {
  const { questions, ...quizInfo } = updateData;
  
  if (questions) {
    await prisma.quizQuestion.deleteMany({
      where: { quizId: id },
    });
  }

  const quiz = await prisma.quiz.update({
    where: { id },
    data: {
      ...quizInfo,
      ...(questions && {
        questions: {
          create: questions,
        },
      }),
    },
    include: {
      questions: true,
    },
  });
  return quiz;
};

const deleteQuiz = async (id) => {
  await prisma.quiz.delete({
    where: { id },
  });
  return { message: 'Quiz deleted successfully' };
};

const submitQuizAttempt = async (userId, quizId, answers) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true },
  });

  let score = 0;
  let totalPoints = 0;

  quiz.questions.forEach((question) => {
    totalPoints += question.points;
    if (answers[question.id] === question.correctAnswer) {
      score += question.points;
    }
  });

  const passed = (score / totalPoints) * 100 >= quiz.passingScore;

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId,
      quizId,
      score,
      totalPoints,
      passed,
      answers,
      completedAt: new Date(),
    },
  });

  return attempt;
};

const getUserQuizAttempts = async (userId, quizId) => {
  const attempts = await prisma.quizAttempt.findMany({
    where: {
      userId,
      ...(quizId && { quizId }),
    },
    include: {
      quiz: true,
    },
    orderBy: { completedAt: 'desc' },
  });
  return attempts;
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
