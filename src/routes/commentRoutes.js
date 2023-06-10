import express from "express";
import {
  uploadComment,
  updateComment,
  deleteComment,
  getRoomComment,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/uploadComment", authMiddleware, uploadComment);
router.post("/getroomComment", authMiddleware, getRoomComment);
router.put("/updateComment", authMiddleware, updateComment);
router.delete("/deleteComment", authMiddleware, deleteComment);

export default router;
