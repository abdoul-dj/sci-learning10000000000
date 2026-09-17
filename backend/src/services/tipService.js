import Tip from "../models/Tip.js";
import Category from "../models/Category.js";
import { isValidId, serializeTip } from "../utils/mongo.js";

export const getAllTips = async (category) => {
  const filter = {};
  if (category) {
    const cat = await Category.findOne({ name: category });
    if (!cat) return [];
    filter.category = cat._id;
  }
  const tips = await Tip.find(filter).populate("category").sort({ createdAt: -1 });
  return tips.map(serializeTip);
};

export const getTipById = async (id) => {
  if (!isValidId(id)) return null;
  const tip = await Tip.findById(id).populate("category");
  return serializeTip(tip);
};

export const createTip = async (data) => {
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
  const created = await Tip.create({
    title: data.title,
    content: data.content,
    category: categoryRef,
    difficulty: data.difficulty || "Beginner",
    read_time: data.read_time || "3 min read",
  });
  return getTipById(created._id);
};

export const updateTip = async (id, data) => {
  if (!isValidId(id)) return null;
  const patch = {
    title: data.title,
    content: data.content,
    read_time: data.read_time,
  };
  if (isValidId(data.category_id)) {
    patch.category = data.category_id;
  } else if (data.category) {
    const found = await Category.findOne({ name: data.category });
    if (found) patch.category = found._id;
  }
  if (data.difficulty) patch.difficulty = data.difficulty;
  const updated = await Tip.findByIdAndUpdate(id, patch, {
    new: true, runValidators: true,
  });
  if (!updated) return null;
  return getTipById(id);
};

export const deleteTip = async (id) => {
  if (!isValidId(id)) return false;
  const deleted = await Tip.findByIdAndDelete(id);
  return Boolean(deleted);
};
