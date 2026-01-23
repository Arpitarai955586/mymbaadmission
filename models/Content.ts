import mongoose, { Schema, Types } from "mongoose";
const ContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
   slug: {
  type: String,
  unique: true,
  required: true,
  trim: true,
  index: true,
},

    body: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      enum: ["blog", "guide", "article"],
      required: true,
    },
    created_by: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
