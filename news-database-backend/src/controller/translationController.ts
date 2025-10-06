import { Request, Response } from "express";
import * as translationService from "../service/curationService";

export const translationNews = async (req: Request, res: Response) => {
    try {
        const { src_lang, tgt_lang, text } = req.body;

        // 1.Check whether it exists or not
        if(!src_lang || !tgt_lang || !text) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields in the request body.",
            })
        }

        // 2.If exixts, call the service & save the translated news
        const saveNews = await translationService.save({ 
            //translations: text 
            src_lang,
            tgt_lang,
            text,
        });
        
        // 3. Send the response
        res.status(201).json({
            success: true,
            message: "Translated news saved successfully!",
            data: saveNews,
        })
    } catch (error: any) {
        console.error("Error saving curated news:", error);
        res.status(500).json({
      success: false,
      message: "Failed to save translated news.",
    });
        
    }
}