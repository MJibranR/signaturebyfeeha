"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, X } from "lucide-react";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  stockCount: number;
  category: string;
  inStock: boolean;
};

const SORT_OPTIONS = [
  { label: "A to Z",  value: "az" },
  { label: "Z to A",  value: "za" },
  { label: "Price: Low to High",   value: "price-asc" },
  { label: "Price: High to Low",   value: "price-desc" },
  { label: "Best Reviewed",        value: "rating" },
];

function Stars({ rating }: { rating: number }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5 mt-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24"
          fill={i < rating ? "#C9A84C" : "rgba(201,168,76,0.2)"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort]     = useState("az");

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case "az":         list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "za":         list.sort((a, b) => b.name.localeCompare(a.name)); break;
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [search, sort, products]);

  return (
    <main
      className="min-h-screen py-10 px-4 md:px-6"
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
          <h1 className="text-2xl font-black tracking-[0.2em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>
            All Perfume
          </h1>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <p className="text-xs" style={{ color: "#8B6914" }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 flex-1 sm:w-64 px-4 py-2.5 rounded-xl min-w-0"
              style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(8px)" }}>
              <Search size={14} color="#8B6914" className="flex-shrink-0" />
              <input type="text" placeholder="Search perfumes..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-xs outline-none min-w-0"
                style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }} />
              {search && <button onClick={() => setSearch("")}><X size={12} color="#a89070" /></button>}
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(8px)" }}>
              <SlidersHorizontal size={13} color="#8B6914" className="flex-shrink-0" />
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="bg-transparent text-xs outline-none cursor-pointer max-w-[120px] sm:max-w-none"
                style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl mb-2" style={{ color: "#C9A84C" }}>✦</p>
            <p className="text-sm font-bold" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>No perfumes found</p>
            <p className="text-xs mt-1" style={{ color: "#8B6914" }}>Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
            {filtered.map(product => (
              <Link key={product.id} href={`/products/${product.id}`} className="group block">
                <div
                  className="relative rounded-2xl overflow-hidden mb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ aspectRatio: "3/4", background: "rgba(255,255,255,0.85)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  {product.image && (
                    <Image src={product.image} alt={product.name} fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" />
                  )}
                  <div
                    className="absolute bottom-0 left-0 right-0 py-2.5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: "rgba(13,8,0,0.92)", borderTop: "1px solid rgba(201,168,76,0.4)" }}>
                    <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#C9A84C" }}>View Product</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: "inset 0 0 0 1.5px #C9A84C" }} />
                  {product.stockCount <= 3 && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase"
                      style={{ background: "#8B1A1A", color: "#fff" }}>
                      Low Stock
                    </div>
                  )}
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wide leading-snug" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>
                  {product.name}
                </p>
                <Stars rating={product.rating} />
                {product.reviews > 0 && (
                  <p className="text-[10px] mt-0.5" style={{ color: "#a89070" }}>{product.reviews} review{product.reviews > 1 ? "s" : ""}</p>
                )}
                <p className="text-sm font-black mt-1" style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}>
                  Rs.{product.price.toLocaleString()}.00
                </p>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}