import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProducts } from "@/utils/products";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export default async function Dashboard() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Product Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card
            key={product._id}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden"
          >
            <CardHeader className="p-0 pt-2">
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  priority
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <CardTitle className="text-2xl font-semibold mb-3">
                {product.name}
              </CardTitle>
              <p className="text-muted-foreground text-sm mb-4">
                {product.description}
              </p>
              <Badge variant="secondary" className="text-lg py-1 px-2">
                ₹{product.price.toFixed(2)}
              </Badge>
            </CardContent>
            <CardFooter className="text-muted-foreground text-sm p-6 pt-0">
              Created{" "}
              {formatDistanceToNow(new Date(product.createdAt), {
                addSuffix: true,
              })}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
