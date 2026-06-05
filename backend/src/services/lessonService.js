const prisma = require('../config/db');

const createLesson = async (lessonData) => {
  const lesson = await prisma.lesson.create({
    data: lessonData,
  });
  return lesson;
};

const getAllLessons = async (filters = {}) => {
  const { category, level, published } = filters;
  
  const where = {};
  if (category) where.category = category;
  if (level) where.level = level;
  if (published !== undefined) where.published = published === 'true';

  const lessons = await prisma.lesson.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  return lessons;
};

const getLessonById = async (id) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      progress: true,
    },
  });
  return lesson;
};

const updateLesson = async (id, updateData) => {
  const lesson = await prisma.lesson.update({
    where: { id },
    data: updateData,
  });
  return lesson;
};

const deleteLesson = async (id) => {
  await prisma.lesson.delete({
    where: { id },
  });
  return { message: 'Lesson deleted successfully' };
};

const updateLessonProgress = async (userId, lessonId, progress, completed) => {
  const existingProgress = await prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });

  if (existingProgress) {
    const updated = await prisma.lessonProgress.update({
      where: { id: existingProgress.id },
      data: { progress, completed },
    });
    return updated;
  }

  const newProgress = await prisma.lessonProgress.create({
    data: {
      userId,
      lessonId,
      progress,
      completed,
    },
  });
  return newProgress;
};

const getUserProgress = async (userId) => {
  const progress = await prisma.lessonProgress.findMany({
    where: { userId },
    include: {
      lesson: true,
    },
  });
  return progress;
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
  updateLessonProgress,
  getUserProgress,
};
