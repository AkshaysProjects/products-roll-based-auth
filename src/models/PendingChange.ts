import { Schema, model } from "mongoose";
import type { ObjectId } from "../types";

export enum ChangeStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface IPendingChange {
  _id: ObjectId;
  user: ObjectId;
  product?: ObjectId;
  updatedProduct: ObjectId;
  status: ChangeStatus;
  admin?: ObjectId;
}

export const PendingChangeSchema = new Schema<IPendingChange>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    updatedProduct: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PendingProduct",
    },
    status: {
      type: String,
      enum: Object.values(ChangeStatus),
      default: ChangeStatus.PENDING,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PendingChange = model<IPendingChange>(
  "PendingChange",
  PendingChangeSchema
);

export default PendingChange;
