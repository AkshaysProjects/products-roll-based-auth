import jwt from "jsonwebtoken";
import { env } from "../env";

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
		return decoded;
	} catch (error) {
		return null;
	}
};

const verifyLoginToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		return decoded;
	} catch (error) {
		return null;
	}
};

export default {
	generateVerificationToken,
	generateLoginToken,
	verifyVerificationToken,
	verifyLoginToken,
};
