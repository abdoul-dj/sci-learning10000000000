import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    read_time: { type: String, default: "3 min read" },
  },
  { timestamps: true }
);

export default mongoose.model("Tip", tipSchema);
