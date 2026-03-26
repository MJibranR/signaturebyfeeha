// components/Newarrivals.tsx
import { Product } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24"
          fill={i < rating ? "#C9A84C" : "rgba(201,168,76,0.2)"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

interface NewarrivalsProps {
  products: Product[];
}

export default function Newarrivals({ products }: NewarrivalsProps) {
  if (!products.length) return null;

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
          <h2 className="text-xl font-black tracking-[0.2em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>New Arrivals</h2>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {products.map(product => (
            <Link key={product.id} href={`/products/${product.id}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden mb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ aspectRatio: "3/4", background: "rgba(255,255,255,0.85)", border: "1px solid rgba(201,168,76,0.2)" }}>
                {product.image && (
                  <Image src={product.image} alt={product.name} fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" />
                )}
                <div className="absolute bottom-0 left-0 right-0 py-2.5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: "rgba(13,8,0,0.92)", borderTop: "1px solid rgba(201,168,76,0.4)" }}>
                  <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#C9A84C" }}>View Product</span>
                </div>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "inset 0 0 0 1.5px #C9A84C" }} />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase"
                  style={{ background: "rgba(201,168,76,0.9)", color: "#1a0800" }}>New</div>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wide leading-snug" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>{product.name}</p>
              <Stars rating={product.rating} />
              {product.reviews > 0 && (
                <p className="text-[10px] mt-0.5" style={{ color: "#a89070" }}>{product.reviews} review{product.reviews > 1 ? "s" : ""}</p>
              )}
              <p className="text-sm font-black mt-1" style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}>Rs.{product.price.toLocaleString()}.00</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}