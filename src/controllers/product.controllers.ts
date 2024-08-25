import { BadRequest } from "@tsed/exceptions";
import type { NextFunction, Request, Response } from "express";
import { uploadImage } from "../firebase/storage";
import productServices from "../services/product.services";

const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.file) return next(new BadRequest("No file uploaded"));
	try {
		const imageUrl = await uploadImage(req.file);
		const product = await productServices.createProduct(req.body, imageUrl);
		return res.status(201).json(product);
	} catch (error) {
		return next(error);
	}
};

export default { createProduct };
