import express from "express";

import { authMiddleware } from "../middlewares/auth.js";
import {
  saveEdge,
  getRoomEdges,
  deleteAllEdgesFromRoom,
} from "../controllers/edgeController.js";

const router = express.Router();

//ADD ROUTES
router.post("/saveEdge", authMiddleware, saveEdge);
router.post("/getroomedges", authMiddleware, getRoomEdges);
router.post("/deleteedges", authMiddleware, deleteAllEdgesFromRoom);

export default router;
