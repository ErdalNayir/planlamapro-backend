const express = require("express");
const {
  uploadComment,
  updateComment,
  deleteComment,
  getRoomComment,
} = require("../controllers/commentController.js");
const { authMiddleware } = require("../middlewares/auth.js");

const router = express.Router();

//ADD ROUTES
router.post("/uploadComment", authMiddleware, uploadComment);
router.post("/getroomComment", authMiddleware, getRoomComment);
router.put("/updateComment", authMiddleware, updateComment);
router.delete("/deleteComment", authMiddleware, deleteComment);

module.exports = router;
