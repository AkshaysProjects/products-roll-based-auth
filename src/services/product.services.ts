import PendingChange, { ChangeStatus } from "../models/PendingChange";
import type { IProduct } from "../models/Product";
import { type IUser, UserRole } from "../models/User";
import productRepository from "../repositories/product.repository";
import type {
	CreateProductDto,
	UpdateProductDto,
} from "../schemas/product.schema";

const getAllProducts = async () => {
	return productRepository.findAllProducts();
};

const getProductById = async (productId: string) => {
	return productRepository.findProductById(productId);
};

const getPendingChanges = async (user: IUser) => {
	return user.role === UserRole.ADMIN
		? PendingChange.find({ status: ChangeStatus.PENDING })
				.populate("product")
				.lean()
		: PendingChange.find({ user: user._id }).populate("product").lean();
};

const createProduct = async (
	product: CreateProductDto,
	imageUrl: string,
	user: IUser,
) => {
	const newProduct = {
		name: product.name,
		description: product.description,
		price: product.price,
		image: imageUrl,
	};

	return user.role === UserRole.ADMIN
		? productRepository.createProduct(newProduct)
		: productRepository.createPendingProduct(newProduct, user._id);
};

const updateProduct = async (
	productId: string,
	product: UpdateProductDto,
	user: IUser,
	imageUrl: string | undefined,
) => {
	const newProduct: Partial<IProduct> = {
		name: product.name as string,
		description: product.description as string,
		price: product.price as number,
		image: imageUrl as string,
	};

	return user.role === UserRole.ADMIN
		? productRepository.updateProduct(productId, newProduct)
		: productRepository.updateProduct(productId, newProduct, user._id);
};

const deleteProduct = async (productId: string) => {
	return productRepository.deleteProduct(productId);
};

export default {
	getAllProducts,
	getProductById,
	getPendingChanges,
	createProduct,
	updateProduct,
	deleteProduct,
};
