import type { Request, Response } from "express";

const registerUser = (_req: Request, res: Response) => {
	res.send("Registered");
};

const loginUser = (_req: Request, res: Response) => {
	res.send("Logged in");
};

export default { registerUser, loginUser };
