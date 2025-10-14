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