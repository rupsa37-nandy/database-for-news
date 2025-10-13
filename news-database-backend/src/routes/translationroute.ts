import { Router } from "express";
import { translationNews } from "../controller/translationController";

const translationRouter = Router();

// Route to save the translated news
translationRouter.post("/saveTranslateNews", translationNews); 

export default translationRouter;