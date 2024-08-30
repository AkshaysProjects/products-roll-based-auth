import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import authControllers from "../controllers/auth.controllers";
import { loginSchema } from "../schemas/login.schema";
import { registerUserSchema } from "../schemas/register_user.schema";
import { verifyEmailSchema } from "../schemas/verify_email.schema";

// Create a new express router
const authRouter = Router();

// Register a new user
authRouter.post(
  "/register",
  validateRequestBody(registerUserSchema),
  authControllers.registerUser
);

// Verify email of a user
authRouter.post(
  "/verify",
  validateRequestBody(verifyEmailSchema),
  authControllers.verifyEmail
);

// Login a user
authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authControllers.loginUser
);

export default authRouter;
