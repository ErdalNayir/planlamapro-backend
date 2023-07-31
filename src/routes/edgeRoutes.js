const express = require("express");

const { authMiddleware } = require("../middlewares/auth.js");
const {
  saveEdge,
  getRoomEdges,
  deleteAllEdgesFromRoom,
} = require("../controllers/edgeController.js");

const router = express.Router();

//ADD ROUTES
router.post("/saveEdge", authMiddleware, saveEdge);
router.post("/getroomedges", authMiddleware, getRoomEdges);
router.post("/deleteedges", authMiddleware, deleteAllEdgesFromRoom);

module.exports = router;
