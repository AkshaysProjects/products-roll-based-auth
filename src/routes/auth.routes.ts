import { Router } from "express";

// Create a new express router
const authRouter = Router();

// Register a new user
authRouter.post("/register", (_req, res) => {
	res.send("Registered");
});

// Login a user
authRouter.post("/login", (_req, res) => {
	res.send("Logged in");
});

export default authRouter;
