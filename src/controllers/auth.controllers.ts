import type { Request, Response } from "express";
import type { RegisterUserDto } from "../schemas/register_user.schema";
import authServices from "../services/auth.services";

const registerUser = async (req: Request, res: Response) => {
	const registerUserDto: RegisterUserDto = req.body;
	try {
		const user = await authServices.registerUser(registerUserDto);
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const loginUser = (_req: Request, res: Response) => {
	res.send("Logged in");
};

export default { registerUser, loginUser };
