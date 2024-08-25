import jwt from "jsonwebtoken";
import { Unauthorized } from "ts-httpexceptions";
import { client } from "../config/redis";
import { env } from "../env";

export interface JwtPayload {
	userId: string;
}

const generateToken = (userId: string, secret: string, exp: number): string => {
	const token = jwt.sign({ userId }, secret, {
		expiresIn: exp,
	});
	client.set(token, userId, "EX", exp);
	return token;
};

const verifyToken = async (
	token: string,
	secret: string,
): Promise<JwtPayload> => {
	try {
		const decoded = jwt.verify(token, secret) as JwtPayload;
		const userId = await client.get(token);

		if (!userId) throw new Unauthorized("Invalid token");

		await client.del(token); // Unset the token from Redis after verifying it
		return decoded;
	} catch (error) {
		throw new Unauthorized("Invalid token");
	}
};

export const generateVerificationToken = (
	userId: string,
	exp: number = 60 * 60,
): string => {
	return generateToken(userId, env.JWT_VERIFICATION_SECRET, exp);
};

export const generateLoginToken = (
	userId: string,
	exp: number = 60 * 60,
): string => {
	return generateToken(userId, env.JWT_SECRET, exp);
};

export const verifyVerificationToken = (token: string): Promise<JwtPayload> => {
	return verifyToken(token, env.JWT_VERIFICATION_SECRET);
};

export const verifyLoginToken = (token: string): Promise<JwtPayload> => {
	return verifyToken(token, env.JWT_SECRET);
};

export default {
	generateVerificationToken,
	generateLoginToken,
	verifyVerificationToken,
	verifyLoginToken,
};
