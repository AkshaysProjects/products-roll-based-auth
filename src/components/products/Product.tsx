"use client";

import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { Product } from "@/types/product";
import api from "@/utils/api";
import { dataURLToBlob } from "@/utils/image";
import { useState } from "react";
import ProductEdit from "./ProductEdit";
import ProductView from "./ProductView";

export default function ProductDetails({
  product: initialProduct,
}: {
  product: Product;
}) {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState(initialProduct);

  const handleSave = (updatedProduct: Product) => {
    setIsEditing(false);
    setProduct(updatedProduct);
    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    formData.append("description", updatedProduct.description);
    formData.append("price", updatedProduct.price.toString());
    const imgBlob = updatedProduct.image === product.image ? product.image : dataURLToBlob(updatedProduct.image);
    formData.append("image", imgBlob);
    api.patch(`/api/product/${updatedProduct._id}`, formData).then((data) => {
      data.data;
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    console.log(isAuthenticated);
    if (isAuthenticated) setIsEditing(true);
    else
      toast({
        title: "Please login to edit this product",
        description: "You must be logged in to edit this product.",
      });
  };

  return isEditing ? (
    <ProductEdit
      product={product}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  ) : (
    <ProductView product={product} onEdit={handleEdit} />
  );
}
