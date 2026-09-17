import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },
    score: { type: Number, required: true },
    total_questions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    answers: { type: Array, default: [] },
  },
  { timestamps: true }
);

quizResultSchema.index({ user: 1, quiz: 1, createdAt: -1 });

export default mongoose.model("QuizResult", quizResultSchema);
