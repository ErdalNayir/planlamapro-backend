import express from "express";
import {
  uploadComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/uploadComment", authMiddleware, uploadComment);
router.put("/updateComment", authMiddleware, updateComment);
router.delete("/deleteComment", authMiddleware, deleteComment);

export default router;
