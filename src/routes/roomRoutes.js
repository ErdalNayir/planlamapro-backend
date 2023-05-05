import express from "express";
import {
  createRoom,
  getRoomByOwner,
  getRoomById,
  deleteRoom,
  updateRoom,
  addUserToRoom,
} from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/createRoom", authMiddleware, createRoom);
router.delete("/deleteroom", authMiddleware, deleteRoom);
router.put("/updateroom", authMiddleware, updateRoom);
router.post("/inviteMember", authMiddleware, addUserToRoom);

//GET ROUTES
router.get("/getbyowner", getRoomByOwner);
router.get("/getbyid", getRoomById);

export default router;
