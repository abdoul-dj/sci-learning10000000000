const lessonService = require('../services/lessonService');

const createLesson = async (req, res) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllLessons = async (req, res) => {
  try {
    const lessons = await lessonService.getAllLessons(req.query);
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    const lesson = await lessonService.updateLesson(req.params.id, req.body);
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const result = await lessonService.deleteLesson(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLessonProgress = async (req, res) => {
  try {
    const { progress, completed } = req.body;
    const lessonProgress = await lessonService.updateLessonProgress(
      req.user.id,
      req.params.id,
      progress,
      completed
    );
    res.json(lessonProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserProgress = async (req, res) => {
  try {
    const progress = await lessonService.getUserProgress(req.user.id);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
