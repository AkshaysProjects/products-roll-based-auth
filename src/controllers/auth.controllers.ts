import type { NextFunction, Request, Response } from "express";
import { InternalServerError } from "ts-httpexceptions";
import type { LoginDto } from "../schemas/login.schema";
import type { RegisterUserDto } from "../schemas/register_user.schema";
import authServices from "../services/auth.services";

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
		return res.status(200).json(user);
	} catch (error) {
		return next(error);
	}
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, token }: LoginDto = req.body;

	try {
		// If email is provided, login with email
		const response = email
			? await authServices.loginWithEmail(email)
			: // If token is provided, login with token
				token
				? await authServices.loginWithToken(token)
				: null;

		// If response is null, throw an error
		if (!response)
			throw new InternalServerError("Something went wrong, please try again");

		// Return the response
		return res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
};

export default { registerUser, verifyEmail, loginUser };
