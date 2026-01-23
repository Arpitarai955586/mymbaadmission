import mongoose, { Schema, Types } from "mongoose";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },

    // ✅ NEW FIELDS (FROM UI)
    level: {
      type: String,
      enum: ["Undergraduate", "Graduate", "Postgraduate", "Diploma"],
      required: true,
    },
    fees: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    // future use (career scope)
    career_scope: {
      type: String,
    },

    is_active: {
      type: Boolean,
      default: true,
    },
    created_by: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);
