
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

/* =========================
   CORS CONFIGURATION
========================= */

app.use(
  cors({
    origin: [
      "https://learnsciences.onrender.com",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================
   HEALTH CHECK
========================= */

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ScienceLearn API is running",
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/users", userRoutes);

/* =========================
   API 404 HANDLER
========================= */

app.use("/api", (req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err);

  if (err?.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  if (err?.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err?.code === 11000) {
    return res.status(400).json({
      message: "Duplicate value",
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
});

export default app;
