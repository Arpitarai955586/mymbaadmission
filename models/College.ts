import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  street_address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  google_map_link: {
    type: String,
  },
});

const mediaSchema = new mongoose.Schema({
  cover: {
    type: String,
  },
});

const contentSchema = new mongoose.Schema({
  overview: {
    type: String,
  },
  admission: {
    type: String,
  },
});

const collegeSchema = new mongoose.Schema(
  {
    college_id: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    short_name: {
      type: String,
    },

    type: {
      type: String,
      enum: ["Government", "Private", "Autonomous"],
    },

    // ✅ NEW FIELD: Established Year
    established_year: {
      type: Number, // example: 1960
    },

    // ✅ NEW FIELD: Ranking
    ranking: {
      type: String, // example: "#1 in India", "NIRF 12"
    },

    location: locationSchema,

    approved_by: [
      {
        type: String,
      },
    ],

    exams_accepted: [
      {
        type: String,
      },
    ],

    courses_offered: [
      {
        type: String,
      },
    ],

    highlights: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    media: mediaSchema,

    content: contentSchema,
  },
  { timestamps: true }
);

export default mongoose.models.College ||
  mongoose.model("College", collegeSchema);
