import { Request, Response } from "express";
import * as cserv from "../service/curationService";
import Curation from "../models/curationmodel";

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

    // 1. Validate input
    if (!id || !edited_news) {
      return res.status(400).json({
        success: false,
        message: "Both 'id' and 'editedNews' are required.",
      });
    }

    // 2. Call service
    const updatedNews = await cserv.updateEditedNewsById(id, edited_news);
    console.log("edited news \n", updatedNews);

    // 3. Handle not found
    if (!updatedNews) {
      return res.status(404).json({
        success: false,
        message: `No record found with id: ${id}`,
      });
    }

    // 4. Return success
    return res.status(200).json({
      success: true,
      message: "Edited news updated successfully.",
      data: updatedNews,
    });
  } catch (error: any) {
    console.error("Error updating edited news:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating news.",
      error: error.message,
    });
  }
};
/*
export const updateEditedNews = async (req: Request, res: Response) => {
  try {
    const { id, editedNews } = req.body;

    if (!id || !editedNews) {
      return res.status(400).json({
        success: false,
        message: "Both 'id' and 'editedNews' are required.",
      });
    }

    const updatedCuration = await curationService.updateEditedNewsById(id, editedNews);

    return res.status(200).json({
      success: true,
      message: "Edited news updated or created successfully.",
      data: updatedCuration,
    });
  } catch (error: any) {
    console.error("Error in controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating or saving news.",
      error: error.message,
    });
  }
}; */