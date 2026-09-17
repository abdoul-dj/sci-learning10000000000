import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    option_text: { type: String, required: true, trim: true },
    is_correct: { type: Boolean, default: false },
  },
  { _id: true }
);

const questionSchema = new mongoose.Schema(
  {
    question_text: { type: String, required: true },
    explanation: { type: String, default: "" },
    order_index: { type: Number, default: 0 },
    options: { type: [optionSchema], default: [] },
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    duration_minutes: { type: Number, default: 30 },
    questions: { type: [questionSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
