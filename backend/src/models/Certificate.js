import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CertificateRequest",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    certificate_number: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now },
    certificate_data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
