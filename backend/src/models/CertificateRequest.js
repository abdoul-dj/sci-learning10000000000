import mongoose from "mongoose";

const certificateRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", default: null },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", default: null },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    submitted_marks: { type: Number, default: null },
    verified_score: { type: Number, default: null },
    admin_notes: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("CertificateRequest", certificateRequestSchema);
