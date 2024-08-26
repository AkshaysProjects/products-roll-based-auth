"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/product";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";
import { Pencil } from "lucide-react";
import Image from "next/image";

export default function ProductView({
  product,
  onEdit,
}: {
  product: Product;
  onEdit: () => void;
}) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform hover:scale-105"
          />
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
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
        <Button onClick={onEdit} className="w-full">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Product
        </Button>
      </CardFooter>
    </Card>
  );
}
