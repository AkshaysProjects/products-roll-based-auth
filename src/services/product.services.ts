import productRepository from "../repositories/product.repository";
import type { ProductDto } from "../schemas/product.schema";

export const createProduct = async (
	product: ProductDto,
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
