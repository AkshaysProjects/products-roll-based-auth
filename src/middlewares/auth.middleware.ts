import { Unauthorized } from "@tsed/exceptions";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	// Check if the user is authenticated
	if (req.session.user) return next();

	// If the user is not authenticated, throw an error
	return next(new Unauthorized("Unauthorized"));
};
