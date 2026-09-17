import Lesson from "../models/Lesson.js";
import Category from "../models/Category.js";
import { isValidId, serializeLesson, serializeCategory } from "../utils/mongo.js";

const populateLesson = (query) => query.populate("category");

export const getAllLessons = async (category) => {
  const filter = {};
  if (category) {
    const cat = await Category.findOne({ name: category });
    if (!cat) return [];
    filter.category = cat._id;
  }
  const lessons = await populateLesson(Lesson.find(filter).sort({ createdAt: -1 }));
  return lessons.map(serializeLesson);
};

export const getLessonById = async (id) => {
  if (!isValidId(id)) return null;
  const lesson = await populateLesson(Lesson.findById(id));
  return serializeLesson(lesson);
};

export const createLesson = async (data) => {
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
  const created = await Lesson.create({
    title: data.title,
    description: data.description,
    category: categoryRef,
    content: data.content,
    difficulty: data.difficulty || "Beginner",
    image_url: data.image_url || null,
  });
  return getLessonById(created._id);
};

export const updateLesson = async (id, data) => {
  if (!isValidId(id)) return null;
  const patch = {
    title: data.title,
    description: data.description,
    content: data.content,
    image_url: data.image_url || null,
  };
  if (isValidId(data.category_id)) {
    patch.category = data.category_id;
  } else if (data.category) {
    const found = await Category.findOne({ name: data.category });
    if (found) patch.category = found._id;
  }
  if (data.difficulty) patch.difficulty = data.difficulty;
  const updated = await Lesson.findByIdAndUpdate(id, patch, {
    new: true, runValidators: true,
  });
  if (!updated) return null;
  return getLessonById(id);
};

export const deleteLesson = async (id) => {
  if (!isValidId(id)) return false;
  const deleted = await Lesson.findByIdAndDelete(id);
  return Boolean(deleted);
};

export const getCategories = async () => {
  const categories = await Category.find().sort({ name: 1 });
  return categories.map(serializeCategory);
};
