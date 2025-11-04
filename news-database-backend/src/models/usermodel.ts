import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    api_key: { type: String, required: false },
    role: {
      type: [String], required: true,
      enum: ["Admin", "Curator", "Proof Reader"], // ENUM for roles
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
