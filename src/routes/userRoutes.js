import express from "express";
import { signup, login, updateUser } from "../controllers/userController.js";

const router = express.Router();

//ADD ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.post("/updateUser", updateUser);

export default router;
