export const dynamic = "force-dynamic";
import { getProductById, getProducts } from "@/lib/actions/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

// Pre-generate routes for all products at build time
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}