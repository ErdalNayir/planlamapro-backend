import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/users.js";
import { jwtKey } from "../../config.js";

// Kayıt olma
export const signup = async (req, res) => {
  try {
    const { name, surname, age, username, password, confirmPassword, gender } =
      req.body;

    // Check if user already exists
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      name,
      surname,
      age,
      username,
      gender,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ username, id: newUser._id }, jwtKey, {
      expiresIn: "3h",
    });

    // Send the token as a response
    res.json({ newUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
