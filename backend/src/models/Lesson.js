import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    content: { type: String, required: true },
    image_url: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
