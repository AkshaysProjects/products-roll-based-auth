import { z } from "zod";

export const createProductSchema = z.object({
	name: z.string().min(1).max(50),
	description: z.string().min(1).max(500),
	price: z.coerce.number(),
});

export const updateProductSchema = z.object({
	name: z.string().min(1).max(50).optional(),
	description: z.string().min(1).max(500).optional(),
	price: z.coerce.number().optional(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
