import PendingChange from "../models/PendingChange";
import PendingProduct from "../models/PendingProduct";
import Product, { type IProduct } from "../models/Product";
import { ObjectId } from "../types";

const createProduct = async (product: Partial<IProduct>) => {
	return Product.create(product).then((data) => ({ data }));
};

const createPendingProduct = async (
	product: Partial<IProduct>,
	userId: ObjectId,
) => {
	const data = await PendingProduct.create(product);
	const change = await PendingChange.create({
		user: userId,
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
			user: userId,
			product: new ObjectId(productId),
			pendingChange: pendingChange._id,
		});
		return { data: pendingChange, change };
	}
	return Product.findByIdAndUpdate(productId, data, { new: true })
		.lean()
		.then((data) => ({ data }));
};

const deleteProduct = async (productId: string) => {
	return Product.findByIdAndDelete(productId);
};

export default {
	createProduct,
	createPendingProduct,
	findAllProducts,
	findProductById,
	findByIdAndUpdate,
	updateProduct,
	deleteProduct,
};
