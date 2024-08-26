"use client";

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
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState(initialProduct);

  const handleSave = (updatedProduct: Product) => {
    setIsEditing(false);
    setProduct(updatedProduct);
    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    formData.append("description", updatedProduct.description);
    formData.append("price", updatedProduct.price.toString());
    const imgBlob = dataURLToBlob(updatedProduct.image);
    formData.append("image", imgBlob);
    api.patch(`/api/product/${updatedProduct._id}`, formData).then((data) => {
      data.data;
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <ProductEdit
      product={product}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  ) : (
    <ProductView product={product} onEdit={() => setIsEditing(true)} />
  );
}
