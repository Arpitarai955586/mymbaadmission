import mongoose, { Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    role_id: {
      type: Types.ObjectId,
      ref: "Role",
      required: true,
    },
    name: String,
    email: { type: String, unique: true },
    password_hash: String,
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
