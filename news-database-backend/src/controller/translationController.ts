import { Request, Response } from "express";
import * as translationService from "../service/translationService";

export const translationNews = async (req: Request, res: Response) => {
    try {
      
        const { src_lang, tgt_lang, text, bengali_translation, hindi_translation } = req.body;

        // 1. Check for mandatory core fields
        if(!src_lang || !tgt_lang || !text) { 
            return res.status(400).json({
                success: false,
                message: "Missing required fields.",
            })
        }

        // 2. Call the service & save the translated news
        const saveNews = await translationService.save({ 
            src_lang,
            tgt_lang,
            text, 
            bengali_translation,
            hindi_translation,
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