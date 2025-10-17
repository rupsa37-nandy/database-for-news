import multer from "multer";
//import path from "path";

// Disk storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to save images
  },
  // ensures only image files(JPG,PNG,GIF) are accepted
  filename: (req, file, cb) => {
    // Example: 1697392439123-myimage.png
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter (optional: allow only images)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Only image files are allowed!"), false); // reject file
  }
};

// Maximum file size: 5MB
const limits = {
  fileSize: 5 * 1024 * 1024,
};

export const upload = multer({ storage, fileFilter, limits });
