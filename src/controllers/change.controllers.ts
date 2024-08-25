import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../models/User";
import productServices from "../services/product.services";

const getPendingChanges = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	try {
		const pendingChanges = await productServices.getPendingChanges(user);
		return res.status(200).json(pendingChanges);
	} catch (error) {
		return next(error);
	}
};

export default { getPendingChanges };
