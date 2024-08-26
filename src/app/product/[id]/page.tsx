import ProductDetails from "@/components/products/Product";
import { getProduct } from "@/utils/products";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);
  return <ProductDetails product={product} />;
}
