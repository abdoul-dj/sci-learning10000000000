import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  mongoose.connection.on("error", () => {
    logger.error("MongoDB connection error");
  });

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
  });
  logger.info("MongoDB connected");
};

export default connectDB;
