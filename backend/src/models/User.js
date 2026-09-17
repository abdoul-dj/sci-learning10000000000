import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = String(ret._id);
    ret.name = ret.full_name;
    delete ret.password_hash;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
