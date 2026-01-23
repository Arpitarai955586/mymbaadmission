import mongoose, { Schema } from "mongoose"

const GallerySchema = new Schema(
  {
    college_id: {
      type: Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    images: [String],
    videos: [String],
  },
  { timestamps: true }
)

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema)
