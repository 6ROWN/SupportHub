import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Route for user registration
router.route("/").post(registerUser);

// Route for user login
router.route("/login").post(loginUser);

export { router as userRoutes };
