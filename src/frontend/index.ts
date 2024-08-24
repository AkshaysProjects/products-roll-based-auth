import { Router } from "express";
import authServices from "../services/auth.services";

// Create a new express router
const frontendRouter = Router();

// Frontend Routes
frontendRouter.get("/login", (req, res) => {
	const token = req.query.token as string;

	if (token) authServices.loginWithToken(token).then((data) => res.send(data));
});

export default frontendRouter;
