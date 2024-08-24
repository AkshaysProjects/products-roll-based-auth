import { z } from "zod";

export const createProductSchema = z.object({
	name: z.string().min(1).max(50),
	description: z.string().min(1).max(500),
	price: z.coerce.number(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
