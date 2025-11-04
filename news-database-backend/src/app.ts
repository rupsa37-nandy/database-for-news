import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import curationRouter from "./routes/curationroute";
import translationRouter from "./routes/translationroute";
import uploadRouter from "./routes/imgUploadroute";
import userRouter from "./routes/userRoute";
import { swaggerSpec } from "./config/swagger";

const apps = express();

// Middleware
apps.use(express.json());
apps.use(cors()); // enable CORS for all origins

// Serve uploaded images statically
apps.use("/uploads", express.static("uploads"));

// Swagger docs
apps.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes (separate each logically)
apps.use("/curation", curationRouter);
apps.use("/translation", translationRouter);
apps.use("/upload", uploadRouter);
apps.use("/user", userRouter);

export default apps;
