import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  street_address: String,
  pincode: String,
  google_map_link: String,
});

const mediaSchema = new mongoose.Schema(
  {
    cover: {
      type: String,
      default: "",   // 👈 important
    },
  },
  { _id: false }
);

const contentSchema = new mongoose.Schema(
  {
    overview: String,
    admission: String,
  },
  { _id: false }
);

const feesSchema = new mongoose.Schema(
  {
    annual_fee: Number,  // yearly fee in INR
    currency: { type: String, default: "INR" },
    fee_structure: String,  // additional notes about fees
  },
  { _id: false }
);

const collegeSchema = new mongoose.Schema(
  {
    college_id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    short_name: String,
    type: { type: String, enum: ["Government", "Private", "Autonomous"] },
    established_year: Number,
    ranking: String,
    location: locationSchema,
    approved_by: [String],
    exams_accepted: [String],
    courses_offered: [String],
    highlights: [String],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // 👇 Important change
    media: {
      type: mediaSchema,
      default: {},   // 👈 so media kabhi undefined na ho
    },

    content: contentSchema,
    
    // 👇 Fees schema
    fees: {
      type: feesSchema,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.models.College ||
  mongoose.model("College", collegeSchema);
