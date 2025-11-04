import { Request, Response } from "express";
import * as userService from "../service/authService";
import User from "../models/usermodel";
import mongoose from "mongoose";
 
// Register - create user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, fullname, password, role} = req.body;
    if (!username || !fullname || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in the request body.",
      });
    }
    const data = await userService.saveUser(username, fullname, password, role);

    res.status(200).json({
      success: true,
      message: "register successfull",
      data
    });
    } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({ 
        success: true, 
        User_Details: users });
  } catch (error: any) {
    res.status(500).json({ 
        success: false, 
        message: error.message 
    });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Extract username from route params
    const { username } = req.params;

    // Call service to delete user and return the deleted document
    const deletedUser = await userService.deleteUser(username);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: `User with username '${username}' not found.`,
      });
    }

    // Respond with user details
    res.status(200).json({
      success: true,
      message: `User '${deletedUser.username}' deleted successfully.`,
      deletedUser: {
        username: deletedUser.username,
        fullname: deletedUser.fullname,
        role: deletedUser.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Update user roles
// export const updateUserRoles = async (req, res) => {
//   try {
//     const { roles } = req.body;
//     const user = await userService.updateUserRoles(req.params.id, roles);
//     res.status(200).json({
//       success: true,
//       message: "User roles updated successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// Get single user
// export const getUser = async (req: Request, res: Response) => {
//   try {
//     const user = await userService.getUser(req.params.username);
//     res.status(200).json({ 
//         success: true, 
//         data: user 
//     });
//   } catch (error: any) {
//     res.status(404).json({ success: false, message: error.message });
//   }
// };