import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import authControllers from "../controllers/auth.controllers";
import { registerUserSchema } from "../schemas/register_user.schema";

// Create a new express router
const authRouter = Router();

// Register a new user
authRouter.post(
	"/register",
	validateRequestBody(registerUserSchema),
	authControllers.registerUser,
);

// Login a user
authRouter.post("/login", authControllers.loginUser);

export default authRouter;
