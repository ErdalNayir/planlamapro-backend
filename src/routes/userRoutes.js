import express from "express";
import { signup, login, updateUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

//ADD ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.post("/updateUser", authMiddleware, updateUser);

export default router;
