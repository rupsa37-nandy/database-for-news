import express from "express";
//When a frontend on a different machine tries to access your backend API, it's considered a cross-origin request
import cors from 'cors';
import curationRouter from "./routes/curationroute";
import translationRouter from "./routes/translationroute";

const apps = express();

// Middleware
apps.use(express.json());

// Enable CORS for all origins
apps.use(cors());

apps.use('/curation', curationRouter, translationRouter);

export default apps;
