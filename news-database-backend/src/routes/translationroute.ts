import { Router } from "express";
import { translationNews } from "../controller/translationController";

const curationRouter = Router();

// Route to save the curated news
curationRouter.post("/translate_news", translationNews);

export default curationRouter;