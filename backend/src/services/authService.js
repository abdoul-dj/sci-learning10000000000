import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { serializeUser } from "../utils/mongo.js";

export const register = async ({ fullName, email, password }) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const created = await User.create({
    full_name: fullName,
    email: email.toLowerCase(),
    password_hash: passwordHash,
    role: "student",
  });

  const user = serializeUser(created);
  const token = signToken({ id: user.id, role: user.role });
  return { user, token };
};

export const login = async ({ email, password }) => {
  const found = await User.findOne({ email: email.toLowerCase() });
  if (!found) {
    throw new Error("Invalid email or password");
  }

  const valid = await bcrypt.compare(password, found.password_hash);
  if (!valid) {
    throw new Error("Invalid email or password");
  }

  if (found.is_active === false) {
    throw new Error("This account is inactive. Contact an administrator.");
  }

  const user = serializeUser(found);
  const token = signToken({ id: user.id, role: user.role });
  return { user, token };
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId);
  return serializeUser(user);
};
