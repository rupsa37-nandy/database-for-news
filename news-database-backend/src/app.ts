import express from "express";
//When a frontend on a different machine tries to access your backend API, it's considered a cross-origin request
import cors from 'cors';
import curationRouter from "./routes/curationroute";
import translationRouter from "./routes/translationroute";
import uploadRouter from "./routes/imgUploadroute";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const apps = express();

// Middleware
apps.use(express.json());
apps.use(cors());  // Enable CORS for all origins

// Serve uploaded images statically
apps.use("/uploads", express.static("uploads"));

// Swagger Docs route
apps.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
apps.use('/curation', curationRouter, translationRouter, uploadRouter);

export default apps;
