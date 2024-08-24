import { type Document, Schema, model } from "mongoose";
import type { ObjectId } from "../types";

export enum UserRole {
	ADMIN = "admin",
	MEMBER = "member",
}

export interface IUser {
	email: string;
	emailVerified: boolean;
	role: UserRole;
}

export interface IUserDocument extends IUser, Document<ObjectId> {}

const UserSchema = new Schema<IUserDocument>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.MEMBER,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

const User = model<IUserDocument>("User", UserSchema);

export default User;
