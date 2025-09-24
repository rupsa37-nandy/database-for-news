import { Request, Response } from "express";
import * as cserv from "../service/curationService";

export const saveCuratedNews = async (req: Request, res: Response) => {
  try {
    const { query, category, curated_news } = req.body;

    // 1. Check whether it exists
    if (!query || !category || !curated_news) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in the request body.",
      });
    }

    // 2. If exists, call the service & save the curated news
    const saveNews = await cserv.save({ query, category, curated_news });

    // 3. Send the response
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