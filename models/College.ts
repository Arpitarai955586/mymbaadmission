import mongoose, { Schema, Types } from "mongoose"

const CollegeSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    basic_info: {
      name: { type: String, required: true },
      short_name: String,
      type: {
        type: String,
        enum: ["Government", "Private", "Deemed", "Autonomous"],
        required: true,
      },
      category: {
        type: String,
        enum: ["University", "College", "Institute"],
        required: true,
      },
      established_year: Number,
      affiliated_university: String,
      approved_by: [String],
      official_website: String,
      logo_url: String,
    },

    location: {
      city: String,
      state: String,
      country: { type: String, default: "India" },
      address: String,
      pincode: String,
    },

    overview: {
      short_description: String,
      detailed_description: String,
      why_choose: [String],
    },

    contact: {
      phone: String,
      email: String,
      admission_email: String,
    },

    seo: {
      meta_title: String,
      meta_description: String,
      keywords: [String],
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    created_by: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.models.College ||
  mongoose.model("College", CollegeSchema)
