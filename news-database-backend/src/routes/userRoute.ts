import { Router } from "express";
import { registerUser, getAllUsers, deleteUser } from "../controller/authController";

const userRouter = Router();

// Save all user
userRouter.post("/save-user", registerUser);

// Get all user details
userRouter.get("/alluser-details", getAllUsers);

// Delete user by username
userRouter.delete("/delete/:username", deleteUser);

export default userRouter;
