import "dotenv/config";
import { z } from "zod";

// Define the schema for the environment variables
const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z
		.string({ message: "Database URL is required" })
		.url({ message: "Database URL must be a valid URL" }),
	RESEND_API_KEY: z.string({ message: "Resend API Key is required" }),
	BASE_URL: z.string().default("http://localhost:3000"),
	JWT_SECRET: z.string({ message: "JWT Secret is required" }),
	JWT_VERIFICATION_SECRET: z.string({
		message: "JWT Verification Secret is required",
	}),
});

// Ensure the parsed environment variables
export const env = envSchema.parse(process.env);
