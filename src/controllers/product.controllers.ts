import { BadRequest } from "@tsed/exceptions";
import type { NextFunction, Request, Response } from "express";
import { uploadImage } from "../firebase/storage";
import { type IUser, UserRole } from "../models/User";
import productServices from "../services/product.services";

const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	if (!req.file) return next(new BadRequest("No file uploaded"));
	try {
		const imageUrl = await uploadImage(req.file);
		const product =
			user.role === UserRole.ADMIN
				? await productServices.createProduct(req.body, imageUrl)
				: await productServices.createProduct(req.body, imageUrl, user.email);
		return res.status(201).json(product);
	} catch (error) {
		return next(error);
	}
};

export default { createProduct };
