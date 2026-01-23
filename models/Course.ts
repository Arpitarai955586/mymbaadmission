import mongoose, { Schema } from "mongoose"

const CourseSchema = new Schema(
  {
    college_id: {
      type: Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

       slug: {
      type: String,
      required: true,
      index: true,
    },

    course_name: {
      type: String,
      required: true,
    },

    degree: {
      type: String,
      enum: ["MBA", "BBA", "BTech", "MTech", "PGDM"],
      required: true,
    },

    duration_years: Number,

    mode: {
      type: String,
      enum: ["Full-time", "Part-time", "Online", "Distance"],
    },

    specializations: [String],

    eligibility: {
      qualification: String,
      minimum_marks: {
        general: String,
        reserved: String,
      },
      work_experience_required: Boolean,
      final_year_allowed: Boolean,
    },

    entrance_exams: [
      {
        exam_name: String,
        mandatory: Boolean,
        cutoff: String,
      },
    ],

    intake: String,
  },
  { timestamps: true }
)

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema)
