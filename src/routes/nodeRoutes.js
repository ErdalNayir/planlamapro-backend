import express from "express";
import {
  saveTimeNode,
  updatedNode,
  deleteNode,
  getRoomNodes,
  deleteAllNodesFromRoom,
} from "../controllers/nodeController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/addNode", authMiddleware, saveTimeNode);
router.post("/getroomnodes", authMiddleware, getRoomNodes);
router.post("/deletenodes", authMiddleware, deleteAllNodesFromRoom);

router.put("/updateNode", authMiddleware, updatedNode);
router.delete("/deleteNode", authMiddleware, deleteNode);

export default router;
