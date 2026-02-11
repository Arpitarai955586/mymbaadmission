import mongoose, { Schema, Types } from "mongoose";

const CourseSchema = new Schema(
  {
    // Custom readable ID (not Mongo _id)
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
  type: String,
  required: true
},


    duration_years: {
      type: Number,
      required: true,
      min: 1,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    default_fees: {
      currency: {
        type: String,
        default: "INR",
      },
      total_fee: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    entrance_exams: [
      {
        type: String, // agar exam ka slug store karna ho
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);
