import { Router } from "express";
import { registerUser, getAllUsers, getUser, deleteUser } from "../controller/authController";

const userRouter = Router();

// Save all user
userRouter.post("/save-user", registerUser);

// Get all user details by username
userRouter.get("/alluser-details", getAllUsers);

// Get particular user by username
userRouter.get("/get-user", getUser)

// Delete user by username
userRouter.delete("/delete", deleteUser);

export default userRouter;
