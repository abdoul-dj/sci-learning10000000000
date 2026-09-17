import * as lessonService from "../services/lessonService.js";

export const getAll = async (req, res) => {
  try {
    const lessons = await lessonService.getAllLessons(req.query.category);
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const lesson = await lessonService.updateLesson(req.params.id, req.body);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await lessonService.deleteLesson(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Lesson not found" });
    res.json({ message: "Lesson deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await lessonService.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
