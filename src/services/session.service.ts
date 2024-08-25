import type { Request } from "express";
import type { IUser } from "../models/User";

export const sessionService = {
	createSession: async (req: Request, user: IUser) => {
		req.session.user = user;
	},
};
