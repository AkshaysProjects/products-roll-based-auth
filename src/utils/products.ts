import { Product } from "@/types/product";
import api from "@/utils/api";

const formatProduct = (product: Product) => ({
  ...product,
  createdAt: new Date(product.createdAt),
  updatedAt: new Date(product.updatedAt),
});

export const getProducts = () =>
  api.get<Product[]>("/api/product").then((res) => res.data.map(formatProduct));

export const getProduct = (id: string) =>
  api.get<Product>(`/api/product/${id}`).then((res) => formatProduct(res.data));
