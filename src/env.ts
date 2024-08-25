import "dotenv/config";
import { z } from "zod";

// Define the schema for the environment variables
const envSchema = z.object({
	// Port
	PORT: z.coerce.number().default(3000),

	// Node Environment
	NODE_ENV: z.enum(["development", "production"]).default("development"),

	// Database URL
	DATABASE_URL: z
		.string({ message: "Database URL is required" })
		.url({ message: "Database URL must be a valid URL" }),

	// Resend API Key
	RESEND_API_KEY: z.string({ message: "Resend API Key is required" }),

	// Base URL
	BASE_URL: z.string().default("http://localhost:3000"),

	// JWT Secret
	JWT_SECRET: z.string({ message: "JWT Secret is required" }),
	JWT_VERIFICATION_SECRET: z.string({
		message: "JWT Verification Secret is required",
	}),

	// Session Secret
	SESSION_SECRET: z.string({ message: "Session Secret is required" }),

	// Firebase Admin SDK
	FIREBASE_PROJECT_ID: z.string({ message: "Firebase Project ID is required" }),
	FIREBASE_PRIVATE_KEY: z.string({
		message: "Firebase Private Key is required",
	}),
	FIREBASE_CLIENT_EMAIL: z.string({
		message: "Firebase Client Email is required",
	}),
	FIREBASE_BUCKET: z.string({ message: "Firebase Bucket is required" }),

	// Redis Config
	REDIS_HOST: z.string({ message: "Redis Host is required" }),
	REDIS_PORT: z.coerce.number().default(6379),
	REDIS_PASSWORD: z.string({ message: "Redis Password is required" }),
});

// Ensure the parsed environment variables
export const env = envSchema.parse(process.env);
