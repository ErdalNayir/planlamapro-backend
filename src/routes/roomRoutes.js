import express from "express";
import {
  createRoom,
  getRoomByOwner,
  getRoomById,
  deleteRoom,
  updateRoom,
  addUserToRoom,
  getInvitedRooms,
} from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/createRoom", authMiddleware, createRoom);
router.delete("/deleteroom", authMiddleware, deleteRoom);
router.put("/updateroom", authMiddleware, updateRoom);
router.post("/inviteMember", authMiddleware, addUserToRoom);
router.post("/getinvitedrooms", authMiddleware, getInvitedRooms);

//GET ROUTES
router.post("/getbyowner", authMiddleware, getRoomByOwner);
router.get("/getbyid", authMiddleware, getRoomById);

export default router;
