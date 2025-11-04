import bcrypt from "bcryptjs";
import User from "../models/usermodel";

// Save user details
export const saveUser = async (username: string, fullname: string, password: string, role: string[]) => {
  // Check if username exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    username,
    fullname,
    password: hashedPassword,
    role: role && role.length ? role : ["user"], // default role if none provided
  });

  return await user.save();
};

// Get all users (hide passwords)
export const getAllUsers = async () => {
  return await User.find().select("-password");
};

// Delete user by username
export const deleteUser = async (username: string) => {
  const user = await User.findOneAndDelete({ username });
  if (!user) throw new Error("User not found");
  return user;
};
