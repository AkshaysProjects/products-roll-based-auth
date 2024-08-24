import { z } from "zod";
import { UserRole } from "../models/User";

export const registerUserSchema = z.object({
	email: z.string().email(),
	role: z.nativeEnum(UserRole).optional(),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
