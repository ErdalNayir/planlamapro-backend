const express = require("express");
const {
  signup,
  login,
  updateUser,
  cikisYap,
} = require("../controllers/userController.js");
const { authMiddleware } = require("../middlewares/auth.js");

const router = express.Router();

//ADD ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.post("/updateUser", authMiddleware, updateUser);
router.get("/logout", authMiddleware, cikisYap);

module.exports = router;
