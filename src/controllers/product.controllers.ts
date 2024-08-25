import { BadRequest, NotFound, Unauthorized } from "@tsed/exceptions";
import type { NextFunction, Request, Response } from "express";
import { uploadImage } from "../firebase/storage";
import { type IUser, UserRole } from "../models/User";
import productServices from "../services/product.services";

const getAllProducts = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = await productServices.getAllProducts();
		return res.status(200).json(products);
	} catch (error) {
		return next(error);
	}
};

const getProductById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const productId = req.params.id;
	if (!productId) return next(new BadRequest("No product id provided"));
	try {
		const product = await productServices.getProductById(productId);
		if (!product) throw new NotFound("Product not found");
		return res.status(200).json(product);
	} catch (error) {
		return next(error);
	}
};

const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	if (!req.file) return next(new BadRequest("No file uploaded"));
	try {
		const imageUrl = await uploadImage(req.file);
		const product = await productServices.createProduct(
			req.body,
			imageUrl,
			user,
		);
		return res.status(201).json(product);
	} catch (error) {
		return next(error);
	}
};

const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	const productId = req.params.id;
	if (!productId) return next(new BadRequest("No product id provided"));
	try {
		const imageUrl = req.file ? await uploadImage(req.file) : undefined;
		const product = await productServices.updateProduct(
			productId,
			req.body,
			user,
			imageUrl,
		);
		return res.status(200).json(product);
	} catch (error) {
		return next(error);
	}
};

const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.session.user as IUser;
	if (user.role !== UserRole.ADMIN)
		return next(new Unauthorized("Unauthorized"));
	const productId = req.params.id;
	if (!productId) return next(new BadRequest("No product id provided"));
	try {
		const product = await productServices.deleteProduct(productId);
		return res.status(200).json(product);
	} catch (error) {
		return next(error);
	}
};

export default {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
