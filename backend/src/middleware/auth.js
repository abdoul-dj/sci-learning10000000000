import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";
import { serializeUser } from "../utils/mongo.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.is_active === false) {
      return res.status(401).json({ message: "This account is inactive. Contact an administrator." });
    }

    req.user = serializeUser(user);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);
      if (user) req.user = serializeUser(user);
    }
    next();
  } catch {
    next();
  }
};
