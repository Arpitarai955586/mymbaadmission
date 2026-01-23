import mongoose, { Schema } from "mongoose"

const PlacementSchema = new Schema(
  {
    college_id: {
      type: Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    placement_available: Boolean,
    overview: String,
    average_package: String,
    highest_package: String,
    top_recruiters: [String],
    top_domains: [String],
  },
  { timestamps: true }
)

export default mongoose.models.Placement ||
  mongoose.model("Placement", PlacementSchema)
