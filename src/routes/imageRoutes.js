import express from "express";
import { uploadImage, deleteImage } from "../controllers/imageController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/uploadImg", authMiddleware, uploadImage);
router.delete("/deleteImg", authMiddleware, deleteImage);

export default router;
