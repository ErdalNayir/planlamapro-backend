import express from "express";
import { uploadImage, deleteImage } from "../controllers/imageController.js";
import { authMiddleware } from "../middlewares/auth.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

const router = express.Router();

//ADD ROUTES
router.post("/uploadImg", authMiddleware, upload.single("image"), uploadImage);
router.delete("/deleteImg", authMiddleware, deleteImage);

export default router;
