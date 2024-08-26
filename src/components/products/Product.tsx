"use client";

import { Product } from "@/types/product";
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
    console.log("Saving product:", updatedProduct);
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
