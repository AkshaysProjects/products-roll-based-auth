import { BadRequest, Unauthorized } from "@tsed/exceptions";
import type { NextFunction, Request, Response } from "express";
import { type IUser, UserRole } from "../models/User";
import changeServices from "../services/change.services";

const getPendingChanges = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	try {
		const pendingChanges = await changeServices.getPendingChanges(user);
		return res.status(200).json(pendingChanges);
	} catch (error) {
		return next(error);
	}
};

const approveChange = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	if (user.role !== UserRole.ADMIN)
		return next(new Unauthorized("Unauthorized"));
	const changeId = req.params.id;
	if (!changeId) return next(new BadRequest("No change id provided"));
	try {
		const change = await changeServices.approveChange(changeId, user);
		return res.status(200).json(change);
	} catch (error) {
		return next(error);
	}
};

const rejectChange = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	if (user.role !== UserRole.ADMIN)
		return next(new Unauthorized("Unauthorized"));
	const changeId = req.params.id;
	if (!changeId) return next(new BadRequest("No change id provided"));
	try {
		const change = await changeServices.rejectChange(changeId, user);
		return res.status(200).json(change);
	} catch (error) {
		return next(error);
	}
};

export default { getPendingChanges, approveChange, rejectChange };
