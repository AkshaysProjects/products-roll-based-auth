import { Schema, model } from "mongoose";
import type { ObjectId } from "../types";

export interface IPendingProduct {
	_id: ObjectId;
	name?: string;
	description?: string;
	price?: number;
	image?: string;
}

export const PendingProductSchema = new Schema<IPendingProduct>(
	{
		name: {
			type: String,
			trim: true,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
		},
		image: {
			type: String,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

const PendingProduct = model<IPendingProduct>(
	"PendingProduct",
	PendingProductSchema,
);

export default PendingProduct;
