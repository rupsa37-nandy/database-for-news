import { Router } from "express";
import { upload } from "../config/multerConfig";

const uploadRouter = Router();

// upload.single("image") returns a middleware function
uploadRouter.post("/uploadImage", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "Image uploaded successfully",
    file: req.file,
  });
});

export default uploadRouter;
