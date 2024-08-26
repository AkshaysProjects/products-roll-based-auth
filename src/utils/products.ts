import { Product } from "@/types/product";
import api from "@/utils/api";

export const getProducts = () =>
  api.get<Product[]>("/api/product").then((res) =>
    res.data.map((product) => ({
      ...product,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt),
    }))
  );
