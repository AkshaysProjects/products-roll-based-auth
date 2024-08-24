import { z } from "zod";

export const loginSchema = z
	.object({
		email: z.string().email().optional(),
		token: z.string().optional(),
	})
	.refine((data) => data.email || data.token, {
		message: "Either email or token is required",
	})
	.refine((data) => !(data.email && data.token), {
		message: "Only one of email or token is allowed",
	});

export type LoginDto = z.infer<typeof loginSchema>;
