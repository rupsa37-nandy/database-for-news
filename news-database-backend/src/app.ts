import express from "express";

const apps = express();

// Middleware
apps.use(express.json());

// Routes
// apps.get("/", (req, res) => {
//   res.send("API is running");
// });

export default apps;
