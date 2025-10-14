import { Router } from "express";
import { translationNews } from "../controller/translationController";

const translationRouter = Router();

// Route to save the translated news
translationRouter.post("/save_translate_news", translationNews); 

export default translationRouter;