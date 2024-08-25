import { type Document, Schema, model } from "mongoose";
import type { ObjectId } from "../types";

export enum ChangeStatus {
	PENDING = "pending",
	APPROVED = "approved",
	REJECTED = "rejected",
}

export interface IPendingChange {
	userId: ObjectId;
	productId?: ObjectId;
	pendingChange: ObjectId;
	status: ChangeStatus;
	adminId?: ObjectId;
}

export interface IPendingChangeDocument
	extends IPendingChange,
		Document<ObjectId> {}

export const PendingChangeSchema = new Schema<IPendingChangeDocument>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
		pendingChange: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "PendingChange",
		},
		status: {
			type: String,
			enum: Object.values(ChangeStatus),
			default: ChangeStatus.PENDING,
		},
		adminId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

const PendingChange = model<IPendingChangeDocument>(
	"PendingChange",
	PendingChangeSchema,
);

export default PendingChange;
