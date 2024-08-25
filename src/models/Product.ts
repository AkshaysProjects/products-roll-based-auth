import { Schema, model } from "mongoose";
import type { ObjectId } from "../types";

export interface IProduct {
	_id: ObjectId;
	name: string;
	description: string;
	price: number;
	image: string;
}

export const ProductSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

const Product = model<IProduct>("Product", ProductSchema);

export default Product;
