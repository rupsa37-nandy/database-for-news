import { Router } from "express";
import { saveCuratedNews,updateFromDocument } from "../controller/curationController";

const curationRouter = Router();

// Route to save the curated news
curationRouter.post("/save_curated_news", saveCuratedNews);

//Route to save the edited curated news
curationRouter.put('/update', updateFromDocument);

export default curationRouter;