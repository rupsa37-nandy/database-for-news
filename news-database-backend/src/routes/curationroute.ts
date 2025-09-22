import { Router } from "express";
import { saveCuratedNews } from "../controller/curationController";

const curationRouter = Router();

// Route to save the curated news
curationRouter.post("/save_curated_news", saveCuratedNews);

export default curationRouter;