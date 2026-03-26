// lib/products.ts
import { db } from "@/lib/db";
import { products as productsTable } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

export type Product = {
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
  createdAt: Date | null;
};

// Cache for products to avoid repeated DB calls
let productsCache: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 1 minute cache

// Helper to ensure we're on the server
function ensureServerOnly() {
  if (typeof window !== 'undefined') {
    throw new Error('Database operations can only be performed on the server');
  }
}

// Fetch all products from Neon DB
export async function getAllProducts(): Promise<Product[]> {
  ensureServerOnly();
  
  const now = Date.now();
  
  // Return cached products if cache is fresh
  if (productsCache && (now - lastFetchTime) < CACHE_DURATION) {
    return productsCache;
  }
  
  try {
    const allProducts = await db.select().from(productsTable);
    productsCache = allProducts as Product[];
    lastFetchTime = now;
    return productsCache;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

// Get products by IDs
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  ensureServerOnly();
  
  if (!ids.length) return [];
  
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter(p => ids.includes(p.id));
  } catch (error) {
    console.error("Failed to fetch products by IDs:", error);
    return [];
  }
}

// Get trending products (by highest reviews)
export async function getTrendingProducts(limit: number = 8) {
  ensureServerOnly();
  
  try {
    const trending = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.reviews))
      .limit(limit);
    return trending as Product[];
  } catch (error) {
    console.error("Failed to fetch trending products:", error);
    return [];
  }
}

// Get new arrivals (by newest first)
export async function getNewArrivals(limit: number = 8) {
  ensureServerOnly();
  
  try {
    const newArrivals = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.createdAt))
      .limit(limit);
    return newArrivals as Product[];
  } catch (error) {
    console.error("Failed to fetch new arrivals:", error);
    return [];
  }
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  ensureServerOnly();
  
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));
    return product as Product || null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Get related products (excluding current product)
export async function getRelatedProducts(id: string, limit: number = 4): Promise<Product[]> {
  ensureServerOnly();
  
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.id !== id).slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}

// For backward compatibility - this will be populated on server start
export let products: Product[] = [];

// Initialize products on server start
export async function initProducts() {
  ensureServerOnly();
  products = await getAllProducts();
  return products;
}