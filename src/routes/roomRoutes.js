const express = require("express");
const {
  createRoom,
  getRoomByOwner,
  getRoomById,
  deleteRoom,
  updateRoom,
  addUserToRoom,
  getInvitedRooms,
} = require("../controllers/roomController.js");
const { authMiddleware } = require("../middlewares/auth.js");

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

module.exports = router;
