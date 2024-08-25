import type { SessionOptions } from "express-session";
import { env } from "../env";
import type { IUser } from "../models/User";
import { store } from "./redis";

declare module "express-session" {
	interface SessionData {
		user: IUser;
	}
}

const sessionConfig: SessionOptions = {
	store,
	secret: env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60, // 1 hour
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: env.NODE_ENV === "production",
	},
};

export default sessionConfig;
