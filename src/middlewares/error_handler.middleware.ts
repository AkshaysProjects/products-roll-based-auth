import type { NextFunction, Request, Response } from "express";
import { Exception } from "ts-httpexceptions";

const errorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof Exception) {
		if (err.errors) {
			// If errors is provided
			res.set({ "x-errors": JSON.stringify(err.errors) });
		}

		if (err.headers) {
			res.set(err.headers);
		}

		if (err.body) {
			// If a body is provided
			return res.status(err.status).json(err.body);
		}

		return res.status(err.status).send(err.message);
	}

	return next();
};

export default errorHandler;
