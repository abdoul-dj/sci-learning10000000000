import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Lesson from "../models/Lesson.js";
import Quiz from "../models/Quiz.js";
import Tip from "../models/Tip.js";
import Certificate from "../models/Certificate.js";
import CertificateRequest from "../models/CertificateRequest.js";
import QuizResult from "../models/QuizResult.js";
import { isValidId, serializeUser } from "../utils/mongo.js";

export const getAllUsers = async () => {
  const users = await User.find().select("-password_hash").sort({ createdAt: -1 }).lean();
  return users.map(serializeUser).filter(Boolean);
};

export const getUserById = async (id) => {
  if (!isValidId(id)) return null;
  const user = await User.findById(id);
  return serializeUser(user);
};

export const createUser = async ({ full_name, email, password, role, is_active }) => {
  if (!full_name || !email || !password) {
    throw new Error("Full name, email, and password are required");
  }
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new Error("Email already registered");
  }
  const password_hash = await bcrypt.hash(password, 10);
  const created = await User.create({
    full_name,
    email: email.toLowerCase(),
    password_hash,
    role: role === "admin" ? "admin" : "student",
    is_active: typeof is_active === "boolean" ? is_active : true,
  });
  return serializeUser(created);
};

export const updateUser = async (id, data) => {
  if (!isValidId(id)) return null;
  const update = {};
  if (data.full_name) update.full_name = data.full_name;
  if (data.email) update.email = data.email.toLowerCase();
  if (data.role === "admin" || data.role === "student") update.role = data.role;
  if (typeof data.is_active === "boolean") update.is_active = data.is_active;
  if (data.password) {
    update.password_hash = await bcrypt.hash(data.password, 10);
  }
  const updated = await User.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  return serializeUser(updated);
};

export const deleteUser = async (id) => {
  if (!isValidId(id)) return false;
  const deleted = await User.findByIdAndDelete(id);
  return Boolean(deleted);
};

export const getDashboardStats = async () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    activeUsers,
    inactiveUsers,
    newUsers,
    totalLessons,
    totalQuizzes,
    totalTips,
    totalCertificates,
    pendingRequests,
    totalQuizAttempts,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ is_active: { $ne: false } }),
    User.countDocuments({ is_active: false }),
    User.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Lesson.countDocuments(),
    Quiz.countDocuments(),
    Tip.countDocuments(),
    Certificate.countDocuments(),
    CertificateRequest.countDocuments({ status: "Pending" }),
    QuizResult.countDocuments(),
  ]);

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    newUsers,
    totalLessons,
    totalQuizzes,
    totalTips,
    totalCertificates,
    pendingRequests,
    totalQuizAttempts,
  };
};
