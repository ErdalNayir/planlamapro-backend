import express from "express";
import {
  saveTimeNode,
  updatedNode,
  deleteNode,
} from "../controllers/nodeController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/addNode", authMiddleware, saveTimeNode);
router.put("/updateNode", authMiddleware, updatedNode);
router.delete("/deleteNode", authMiddleware, deleteNode);

export default router;
