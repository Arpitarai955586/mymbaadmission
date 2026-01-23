import mongoose, { Schema } from "mongoose"

const FeesSchema = new Schema(
  {
    college_id: {
      type: Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    course_id: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    academic_fee_total: {
      min: Number,
      max: Number,
    },

    hostel_fee_per_year: Number,
    mess_fee_per_year: Number,
    other_charges: Number,
    refundable_deposit: Number,
  },
  { timestamps: true }
)

export default mongoose.models.Fees ||
  mongoose.model("Fees", FeesSchema)
