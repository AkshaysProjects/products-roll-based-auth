import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
