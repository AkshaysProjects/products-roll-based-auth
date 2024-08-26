"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/product";
import { formatDate } from "@/utils/date";
import { PencilIcon, Save, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductEdit({
  product: initialProduct,
  onSave,
  onCancel,
}: {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onCancel: () => void;
}) {
  const [product, setProduct] = useState(initialProduct);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) : value,
    }));
  };

  const handleSave = () => {
    onSave(product);
  };

  const updateImage = (imageSrc: string) => {
    setProduct((prev) => ({
      ...prev,
      image: imageSrc,
    }));
    setImageModalOpen(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Input
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="text-2xl font-bold"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover rounded-lg"
            priority
            fill
            sizes="100vw" />
          <Button
            className="absolute top-2 right-2 w-10 h-10 text-white bg-gray-600 p-2 rounded-full hover:bg-gray-800"
            title="Change photo"
            onClick={() => setImageModalOpen(true)}
          >
            <PencilIcon />
          </Button>
          {imageModalOpen && (
            <Modal
              updateImage={updateImage}
              closeModal={() => setImageModalOpen(false)}
            />
          )}
        </div>
        <div className="space-y-4">
          <Textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="h-32"
          />
          <Input
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
            className="text-2xl font-semibold"
          />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Created: {formatDate(product.createdAt)}
            </p>
            <p className="text-sm text-muted-foreground">
              Last Updated: {formatDate(product.updatedAt)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
