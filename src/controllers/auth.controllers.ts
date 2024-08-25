import type { NextFunction, Request, Response } from "express";
import { InternalServerError } from "ts-httpexceptions";
import type { LoginDto } from "../schemas/login.schema";
import type { RegisterUserDto } from "../schemas/register_user.schema";
import authServices from "../services/auth.services";
import { sessionService } from "../services/session.service";

const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const registerUserDto: RegisterUserDto = req.body;
	try {
		const user = await authServices.registerUser(registerUserDto);
		return res.status(201).json(user);
	} catch (error) {
		return next(error);
	}
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.query.token as string;
	try {
		const user = await authServices.verifyEmail(token);
		await sessionService.createSession(req, user);
		return res.status(200).json(user);
	} catch (error) {
		return next(error);
	}
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, token }: LoginDto = req.body;

	try {
		if (email) {
			const response = await authServices.loginWithEmail(email);
			if (!response) throw new InternalServerError("Something went wrong");
			return res.status(200).json(response);
		}
		if (token) {
			const user = await authServices.loginWithToken(token);
			if (!user) throw new InternalServerError("Something went wrong");
			await sessionService.createSession(req, user);
			return res.status(200).json(user);
		}

		// If neither email nor token is provided, throw an error
		throw new InternalServerError("Something went wrong, please try again");
	} catch (error) {
		return next(error);
	}
};

export default { registerUser, verifyEmail, loginUser };
