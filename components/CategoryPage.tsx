import { Suspense } from "react";
import { getProductsByCategory } from "@/lib/actions/products";
import ProductsClient from "@/app/products/Productsclient";

async function CategoryProducts({ category }: { category: string }) {
  let list: any[] = [];
  try {
    list = await getProductsByCategory(category);
  } catch {
    return (
      <p className="text-center py-24 text-sm" style={{ color: "#a89070", fontStyle: "italic" }}>
        Could not load products. Please try again.
      </p>
    );
  }
  return <ProductsClient products={list} />;
}

function LoadingGrid() {
  return (
    <div className="min-h-screen py-10 px-4 md:px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5 mt-16">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-2xl mb-3" style={{ aspectRatio: "3/4", background: "rgba(201,168,76,0.1)" }} />
              <div className="h-3 rounded mb-1.5" style={{ background: "rgba(201,168,76,0.1)", width: "80%" }} />
              <div className="h-3 rounded" style={{ background: "rgba(201,168,76,0.08)", width: "50%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ category }: { category: string }) {
  return (
    <Suspense fallback={<LoadingGrid />}>
      <CategoryProducts category={category} />
    </Suspense>
  );
}