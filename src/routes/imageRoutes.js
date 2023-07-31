const express = require("express");
const {
  uploadImage,
  deleteImage,
} = require("../controllers/imageController.js");
const { authMiddleware } = require("../middlewares/auth.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

const router = express.Router();

//ADD ROUTES
router.post("/uploadImg", authMiddleware, upload.single("image"), uploadImage);
router.delete("/deleteImg", authMiddleware, deleteImage);

module.exports = router;
