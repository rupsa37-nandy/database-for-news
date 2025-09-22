import express from "express";
import curationRouter from "./routes/curationroute";

const apps = express();

// Middleware
apps.use(express.json());

apps.use('/curation', curationRouter);

export default apps;
