import PendingChange from "../models/PendingChange";
import PendingProduct from "../models/PendingProduct";
import Product, { type IProduct } from "../models/Product";
import { ObjectId } from "../types";

const createProduct = async (product: Partial<IProduct>) => {
	return Product.create(product);
};

const crearePendingProduct = async (
	product: Partial<IProduct>,
	userId: ObjectId,
) => {
	const data = await PendingProduct.create(product);
	const change = await PendingChange.create({
		userId,
		pendingChange: data._id,
	});
	return { data, change };
};

const findAllProducts = async () => {
	return Product.find().lean();
};

const findProductById = async (id: string) => {
	return Product.findById(id).lean();
};

const findByIdAndUpdate = async (id: string, data: Partial<IProduct>) => {
	return Product.findByIdAndUpdate(id, data, { new: true }).lean();
};

const updateProduct = async (
	productId: string,
	data: Partial<IProduct>,
	userId?: ObjectId,
) => {
	if (userId) {
		const pendingChange = await PendingProduct.create(data);
		const change = await PendingChange.create({
			userId,
			productId: new ObjectId(productId),
			pendingChange: pendingChange._id,
		});
		return { pendingChange, change };
	}
	return Product.findByIdAndUpdate(productId, data, { new: true }).lean();
};

const deleteProduct = async (productId: string) => {
	return Product.findByIdAndDelete(productId);
};

export default {
	createProduct,
	crearePendingProduct,
	findAllProducts,
	findProductById,
	findByIdAndUpdate,
	updateProduct,
	deleteProduct,
};
