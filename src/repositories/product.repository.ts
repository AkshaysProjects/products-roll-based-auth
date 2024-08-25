import { NotFound } from "@tsed/exceptions";
import PendingChange from "../models/PendingChange";
import PendingProduct from "../models/PendingProduct";
import Product, { type IProduct } from "../models/Product";
import userRepository from "./user.repository";

const createProduct = async (product: Partial<IProduct>) => {
	return Product.create(product);
};

const crearePendingProduct = async (
	product: Partial<IProduct>,
	email: string,
) => {
	const user = await userRepository.findUserByEmail(email);

	if (!user) throw new NotFound("User not found");

	const data = await PendingProduct.create(product);
	const change = await PendingChange.create({
		userId: user._id,
		pendingChange: data._id,
	});
	return { data, change };
};

const findProductById = async (id: string) => {
	return Product.findById(id);
};

const findByIdAndUpdate = async (id: string, data: Partial<IProduct>) => {
	return Product.findByIdAndUpdate(id, data, { new: true });
};

export default {
	createProduct,
	crearePendingProduct,
	findProductById,
	findByIdAndUpdate,
};
