import { model } from "mongoose";
import { type IProductDocument, ProductSchema } from "./Product";

const PendingProduct = model<IProductDocument>("PendingProduct", ProductSchema);

export default PendingProduct;
