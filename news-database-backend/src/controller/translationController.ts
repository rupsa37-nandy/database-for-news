import { Request, Response } from "express";
import * as translationService from "../service/translationService";

export const translationNews = async (req: Request, res: Response) => {
    try {
      
        const { editedNews, hiTranslation, benTranslation } = req.body;

        // 1. Check for mandatory core fields
        if(!editedNews) { 
            return res.status(400).json({
                success: false,
                message: "Missing 'editedNews' fields.",
            })
        }

        // At least one translation must exist
        if (!hiTranslation && !benTranslation) {
        return res.status(400).json({
            success: false,
            message: "At least one translation ('hiTranslation' or 'benTranslation') must be provided.",
        });
        }

        // 2. Call the service & save the translated news
        const saveNews = await translationService.save({ 
            editedNews,
            hiTranslation: hiTranslation || null,
            benTranslation: benTranslation || null,
        });
        
        // 3. Send the response
        res.status(201).json({
            success: true,
            message: "Translated news saved successfully!",
            data: saveNews,
        })
    } catch (error: any) {
        console.log("Error saving translated news:", error);
        res.status(500).json({
          success: false,
          message: error.message || "Failed to save translated news.", 
        });
    }
}

