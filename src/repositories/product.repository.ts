import Product, { type IProduct } from "../models/Product";

const createProduct = async (product: Partial<IProduct>) => {
	return Product.create(product);
};

const findProductById = async (id: string) => {
	return Product.findById(id);
};

const findByIdAndUpdate = async (id: string, data: Partial<IProduct>) => {
	return Product.findByIdAndUpdate(id, data, { new: true });
};

export default {
	createProduct,
	findProductById,
	findByIdAndUpdate,
};
