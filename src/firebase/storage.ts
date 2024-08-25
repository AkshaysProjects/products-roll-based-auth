import { InternalServerError } from "@tsed/exceptions";
import { v4 as uuid } from "uuid";
import { env } from "../env";
import { bucket } from "./admin";

export const uploadImage = async (
	file: Express.Multer.File,
): Promise<string> => {
	// Generate a unique ID for the file
	const id = uuid();

	// Upload the file to the bucket
	const blob = bucket.file(`${id}_${file.originalname}`);

	// Create a write stream from the blob
	const blobStream = blob.createWriteStream({
		metadata: {
			contentType: file.mimetype,
		},
	});

	// Return a promise that resolves when the upload is complete
	return new Promise((resolve, reject) => {
		blobStream.on("error", (error) => {
			console.warn(error);
			reject(new InternalServerError("Failed to upload image"));
		});

		blobStream.on("finish", () => {
			const imageUrl = `https://storage.googleapis.com/${env.FIREBASE_BUCKET}/${blob.name}`;
			resolve(imageUrl);
		});

		// Pipe the file stream to the blob stream
		blobStream.end(file.buffer);
	});
};
