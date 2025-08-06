import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default: "default-avatar.png",
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    accountStatus: {
      type: String,
      required: true,
      default: "active",
    },
    createdAt: {
      type: Date,
      required: true,
    },
    lastLoginAt: {
      type: Date,
      required: true,
      default: undefined,
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
