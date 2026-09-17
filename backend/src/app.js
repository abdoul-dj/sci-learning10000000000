import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const configured = process.env.FRONTEND_URL || "http://localhost:5173";
      if (!origin || origin === configured || /https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ScienceLearn API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/users", userRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.use((err, req, res, next) => {
  if (err?.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID" });
  }
  if (err?.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err?.code === 11000) {
    return res.status(400).json({ message: "Duplicate value" });
  }
  res.status(500).json({ message: "Internal server error" });
});

export default app;
