import { Request, Response } from "express";
import * as cserv from "../service/curationService";
import Curation from "../models/curationmodel";
import mongoose from "mongoose";

export const saveCuratedNews = async (req: Request, res: Response) => {
  try {
    const { id, query, category, curated_news } = req.body;

    // 1. Check whether it exists
    if (!id || !query || !category || !curated_news) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in the request body.",
      });
    }

     // 2. Check if a curation with the same id already exists
    const existing = await Curation.findOne({ id });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Curation with id ${id} already exists.`,
      });
    }
    
    // 3. If exists, call the service & save the curated news
    const saveNews = await cserv.save({ id, query, category, curated_news });
    console.log("savedNews \n",saveNews);
    
    // 4. Send the response
    res.status(201).json({
      success: true,
      message: "Curated news saved successfully!",
      data: saveNews,
    });
    
  } catch (error: any) {
    console.error("Error saving curated news:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save curated news.",
    });
  }
};

export const updateEditedNews = async (req: Request, res: Response) => {
  try {
    const { id, edited_news } = req.body;

    // 1.UID missing
    if (!id || !edited_news) {
      return res.status(400).json({
        success: false,
        message: "UID is missing in the request body.",
      });
    }

    // 2.Invalid UID format (not a MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid UID format & does not exist.",
      });
    }

    // 3.Continue with your service logic(calling service) (since UID is valid)
    const result = await cserv.updateEditedNewsById(id, edited_news );

    //  4.If service returns null, it means UID not found
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Invalid UID format & does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Edited news updated successfully",
      data: result,
    });

  } catch (error: any) {
    console.error("Service error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Other errors
    return res.status(500).json({
      success: false,
      message: error.message || "An unexpected error occurred",
    });
  }
};