import mongoose, { Schema, models, model } from "mongoose"

const ExamSchema = new Schema(
  {
    exam_id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "MBA Entrance",
        "Engineering",
        "Medical",
        "Management",
        "International MBA",
      ],
    },

    date: {
      type: Date,   // 🔥 IMPORTANT (date type)
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Active", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    description: String,
    eligibility: String,

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export default models.Exam || model("Exam", ExamSchema)
