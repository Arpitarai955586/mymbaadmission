import mongoose, { Schema, Types } from "mongoose";

const CourseSchema = new Schema({
  id: { type: String, required: true, unique: true },

  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },

  name: { type: String, required: true },
  slug: { type: String, required: true },

  duration_years: { type: Number, required: true, min: 1 },

  degree: { type: String, required: true },

  default_fees: {
    currency: { type: String, default: "INR" },
    total_fee: { type: Number, required: true, min: 0 },
  },

  status: {
    type: String,
    enum: ["Upcoming", "Active", "Completed", "Cancelled"],
    default: "Upcoming",
  },

  entrance_exams: [{ type: String }],
}, { timestamps: true })


export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);
