import express from "express";
import { createRoom } from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/createRoom", authMiddleware, createRoom);

export default router;
