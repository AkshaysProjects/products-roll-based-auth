import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../models/User";
import userService from "../services/user.service";

const getUserDetails = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	try {
		const userDetails = await userService.getUserDetails(user);
		return res.status(200).json({ ...user, ...userDetails });
	} catch (error) {
		return next(error);
	}
};

export default { getUserDetails };
