import { UserRole } from "@/enums/user_role";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  role: z.nativeEnum(UserRole),
});

export type RegisterFormData = z.infer<typeof registerSchema>;