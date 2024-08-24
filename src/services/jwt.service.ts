import jwt from "jsonwebtoken";
import { Unauthorized } from "ts-httpexceptions";
import { env } from "../env";

export interface JwtPayload {
	userId: string;
}

export const generateVerificationToken = (
	userId: string,
	exp: number = 60 * 60,
) => {
	return jwt.sign({ userId }, env.JWT_VERIFICATION_SECRET, {
		expiresIn: exp,
	});
};

export const generateLoginToken = (userId: string, exp: number = 60 * 60) => {
	return jwt.sign({ userId }, env.JWT_SECRET, {
		expiresIn: exp,
	});
};

const verifyVerificationToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, env.JWT_VERIFICATION_SECRET);
		// TODO: Invalidate after using it once (Using redis?)
		return decoded as JwtPayload;
	} catch (error) {
		throw new Unauthorized("Invalid token");
	}
};

const verifyLoginToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		// TODO: Invalidate after using it once (Using redis?)
		return decoded as JwtPayload;
	} catch (error) {
		throw new Unauthorized("Invalid token");
	}
};

export default {
	generateVerificationToken,
	generateLoginToken,
	verifyVerificationToken,
	verifyLoginToken,
};
