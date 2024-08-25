import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

// Create a new express router
const userRouter = Router();

// Get information about the current user
userRouter.get("/", authMiddleware, userController.getUserDetails);

export default userRouter;
