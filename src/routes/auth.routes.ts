import { Router } from "express";
import authControllers from "../controllers/auth.controllers";

// Create a new express router
const authRouter = Router();

// Register a new user
authRouter.post("/register", authControllers.registerUser);

// Login a user
authRouter.post("/login", authControllers.loginUser);

export default authRouter;
