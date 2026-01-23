import mongoose, { Schema, Types } from "mongoose"

const ExamSchema = new Schema(
  {
    
   

    name: {
      type: String,
      required: true, // SNAP
    },

    full_name: {
      type: String, // Symbiosis National Aptitude Test
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["National", "State", "University"],
      required: true,
    },

    exam_month: {
      type: String, // December
    },

    website: {
      type: String,
    },

    overview: {
      type: String,
    },

    eligibility: {
      type: String,
    },

    exam_pattern: {
      type: String,
    },

    syllabus: {
      type: String,
    },

    important_dates: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    created_by: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    _id: false, 
  }
)

export default mongoose.models.Exam ||
  mongoose.model("Exam", ExamSchema)
