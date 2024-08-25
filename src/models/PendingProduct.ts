import { model } from "mongoose";
import { type IProduct, ProductSchema } from "./Product";

const PendingProduct = model<IProduct>("PendingProduct", ProductSchema);

export default PendingProduct;
