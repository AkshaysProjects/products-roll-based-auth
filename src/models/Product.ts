import { type Document, Schema, model } from "mongoose";
import type { ObjectId } from "../types";

export interface IProduct {
	name: string;
	description: string;
	price: number;
	image: string;
}

export interface IProductDocument extends IProduct, Document<ObjectId> {}

const ProductSchema = new Schema<IProductDocument>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
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

const Product = model<IProductDocument>("Product", ProductSchema);

export default Product;
