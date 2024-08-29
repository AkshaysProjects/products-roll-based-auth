import { ChangeStatus } from "@/enums/change_status";
import { Product } from "@/types/product";

export interface PendingChange {
  _id: string;
  user: string;
  product?: Product;
  updatedProduct: Product;
  status: ChangeStatus;
  admin?: string;
  createdAt: string;
  updatedAt: string;
}
