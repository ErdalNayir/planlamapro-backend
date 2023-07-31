const express = require("express");

const {
  saveTimeNode,
  updatedNode,
  deleteNode,
  getRoomNodes,
  deleteAllNodesFromRoom,
} = require("../controllers/nodeController.js");
const { authMiddleware } = require("../middlewares/auth.js");

const router = express.Router();

//ADD ROUTES
router.post("/addNode", authMiddleware, saveTimeNode);
router.post("/getroomnodes", authMiddleware, getRoomNodes);
router.post("/deletenodes", authMiddleware, deleteAllNodesFromRoom);

router.put("/updateNode", authMiddleware, updatedNode);
router.delete("/deleteNode", authMiddleware, deleteNode);

module.exports = router;
