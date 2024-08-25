import productRepository from "../repositories/product.repository";
import type { CreateProductDto } from "../schemas/create_product.schema";

export const createProduct = async (
	product: CreateProductDto,
	imageUrl: string,
	email?: string,
) => {
	const newProduct = {
		name: product.name,
		description: product.description,
		price: product.price,
		image: imageUrl,
	};

	return email
		? await productRepository.crearePendingProduct(newProduct, email)
		: await productRepository.createProduct(newProduct);
};

export default { createProduct };
