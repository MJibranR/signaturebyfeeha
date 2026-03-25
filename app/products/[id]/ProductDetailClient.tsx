"use client";
import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  size: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  category: string;
  inStock: boolean;
  stockCount: number;
  shippingFee: number;
};

function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24"
            fill={i < rating ? "#C9A84C" : "rgba(201,168,76,0.2)"}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      {count > 0 && <span className="text-xs" style={{ color: "#a89070" }}>({count} reviews)</span>}
    </div>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

const handleAdd = () => {
  for (let i = 0; i < qty; i++) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  }
  setAdded(true);
  setTimeout(() => setAdded(false), 2000);
};

  return (
    <main
      className="min-h-screen py-10 px-4 md:px-6"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "3/4", background: "rgba(255,255,255,0.85)", border: "1px solid rgba(201,168,76,0.2)" }}>
            {product.image && (
              <Image src={product.image} alt={product.name} fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority />
            )}
            {product.stockCount <= 3 && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
                style={{ background: "#8B1A1A", color: "#fff" }}>
                Only {product.stockCount} left
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 py-2">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#C9A84C" }}>{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight"
                style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>
                {product.name}
              </h1>
              <Stars rating={product.rating} count={product.reviews} />
            </div>

            <p className="text-3xl font-black" style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}>
              Rs.{product.price.toLocaleString()}.00
            </p>

            <div className="text-xs space-y-1" style={{ color: "#5a3e1a" }}>
              <p><span className="font-bold">Size:</span> {product.size}</p>
              <p><span className="font-bold">Category:</span> <span className="capitalize">{product.category}</span></p>
            </div>

            {/* Notes */}
            <div className="rounded-2xl p-4 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <p className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>Fragrance Notes</p>
              {[
                { label: "Top Notes",   value: product.topNotes },
                { label: "Heart Notes", value: product.heartNotes },
                { label: "Base Notes",  value: product.baseNotes },
              ].map(n => (
                <div key={n.label}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: "#C9A84C" }}>{n.label}</p>
                  <p className="text-xs" style={{ color: "#5a3e1a" }}>{n.value}</p>
                </div>
              ))}
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl overflow-hidden"
                style={{ border: "1.5px solid rgba(201,168,76,0.3)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-lg font-black hover:bg-stone-100 transition-colors"
                  style={{ color: "#5a3e1a" }}>−</button>
                <span className="w-10 text-center text-sm font-black"
                  style={{ color: "#1a0a00", borderLeft: "1px solid rgba(201,168,76,0.2)", borderRight: "1px solid rgba(201,168,76,0.2)" }}>
                  {qty}
                </span>
                <button onClick={() => setQty(q => Math.min(product.stockCount, q + 1))}
                  className="w-10 h-11 flex items-center justify-center text-lg font-black hover:bg-stone-100 transition-colors"
                  style={{ color: "#5a3e1a" }}>+</button>
              </div>

              <button onClick={handleAdd} disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                style={{
                  background: added ? "linear-gradient(135deg, #2d8a4e, #1a5c30)" : "linear-gradient(135deg, #1a0f00, #0d0800)",
                  border: `1.5px solid ${added ? "#2d8a4e" : "#C9A84C"}`,
                  color: added ? "#fff" : "#C9A84C",
                }}>
                <ShoppingBag size={14} />
                {!product.inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck,      label: product.shippingFee === 0 ? "Free Shipping" : `Rs.${product.shippingFee} shipping` },
                { icon: Shield,     label: "100% Original" },
                { icon: RotateCcw,  label: "7-Day Returns" },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-center"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <b.icon size={16} color="#C9A84C" />
                  <p className="text-[9px] font-bold tracking-wide uppercase" style={{ color: "#5a3e1a" }}>{b.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}