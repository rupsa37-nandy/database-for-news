import { Router } from "express";
import { translationNews } from "../controller/translationController";

const translationRouter = Router();

// Route to save the translated news
translationRouter.post("/translate_news", translationNews); 

export default translationRouter;