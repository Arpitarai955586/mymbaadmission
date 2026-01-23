import mongoose, { Schema, Types } from "mongoose";

const CollegeSchema = new Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    city: String,
    state: String,
    type: { type: String, enum: ["Govt", "Private"] },
    approved_by: [String], // UGC, AICTE, NAAC
    overview: String,
    fees: String,
    admission_process: String,
    is_active: { type: Boolean, default: true },
    created_by: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.College ||
  mongoose.model("College", CollegeSchema);
