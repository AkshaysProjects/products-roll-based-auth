import productRepository from "../repositories/product.repository";
import type { CreateProductDto } from "../schemas/create_product.schema";

export const createProduct = async (
	product: CreateProductDto,
	imageUrl: string,
) => {
	const newProduct = {
		name: product.name,
		description: product.description,
		price: product.price,
		image: imageUrl,
	};

	return productRepository.createProduct(newProduct);
};

export default { createProduct };
