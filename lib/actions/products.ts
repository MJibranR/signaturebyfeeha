// lib/actions/products.ts
"use server";
import { db } from "@/lib/db";
import { products as productsTable } from "@/lib/schema";
import { eq, desc, and, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

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

// Server action to get all products - can be called from client
export async function getAllProductsAction() {
  try {
    const result = await db.select().from(productsTable);
    console.log(`[getAllProductsAction] found: ${result.length} products`);
    return result as Product[];
  } catch (error) {
    console.error("[getAllProductsAction] Error:", error);
    return [];
  }
}

// Cache for frequently accessed data (server-side only)
export const getProducts = cache(async function getProducts() {
  try {
    const result = await db.select().from(productsTable);
    console.log(`[getProducts] found: ${result.length} products`);
    return result as Product[];
  } catch (error) {
    console.error("[getProducts] Error:", error);
    return [];
  }
});


export const getProductsByCategory = cache(async function getProductsByCategory(category: string) {
  try {
    const result = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.category, category));
    console.log(`[getProductsByCategory] category: "${category}" | found: ${result.length} products`);
    if (result.length > 0) {
      console.log(`  → Sample: ${result[0].name} (category: ${result[0].category})`);
    }
    return result as Product[];
  } catch (error) {
    console.error("[getProductsByCategory] Error:", error);
    return [];
  }
});

export const getProductById = cache(async function getProductById(id: string) {
  try {
    const rows = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));
    return rows[0] as Product | null;
  } catch (error) {
    console.error("[getProductById] Error:", error);
    return null;
  }
});

export async function getProductsByIds(ids: string[]) {
  if (!ids.length) return [];
  try {
    const result = await db
      .select()
      .from(productsTable)
      .where(and(...ids.map(id => eq(productsTable.id, id))));
    return result as Product[];
  } catch (error) {
    console.error("[getProductsByIds] Error:", error);
    return [];
  }
}

export async function getTrendingProducts(limit: number = 8) {
  try {
    const result = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.reviews))
      .limit(limit);
    return result as Product[];
  } catch (error) {
    console.error("[getTrendingProducts] Error:", error);
    return [];
  }
}

export async function getNewArrivals(limit: number = 8) {
  try {
    const result = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.createdAt))
      .limit(limit);
    return result as Product[];
  } catch (error) {
    console.error("[getNewArrivals] Error:", error);
    return [];
  }
}

export async function searchProducts(query: string, limit: number = 10) {
  try {
    const result = await db
      .select()
      .from(productsTable)
      .where(
        and(
          ilike(productsTable.name, `%${query}%`),
          ilike(productsTable.brand, `%${query}%`)
        )
      )
      .limit(limit);
    return result as Product[];
  } catch (error) {
    console.error("[searchProducts] Error:", error);
    return [];
  }
}

export async function createProduct(data: typeof productsTable.$inferInsert) {
  try {
    // Validate required fields
    if (!data.id || !data.name || !data.brand || !data.price) {
      throw new Error("Missing required fields: id, name, brand, or price");
    }
    
    await db.insert(productsTable).values(data);
    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/");
    
    return { success: true, id: data.id };
  } catch (error) {
    console.error("[createProduct] Error:", error);
    return { success: false, error: error };
  }
}

export async function updateProduct(id: string, data: Partial<typeof productsTable.$inferInsert>) {
  try {
    if (!id) {
      throw new Error("Product ID is required");
    }
    
    await db.update(productsTable).set(data).where(eq(productsTable.id, id));
    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath(`/products/${id}`);
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("[updateProduct] Error:", error);
    return { success: false, error: error };
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!id) {
      throw new Error("Product ID is required");
    }
    
    await db.delete(productsTable).where(eq(productsTable.id, id));
    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("[deleteProduct] Error:", error);
    return { success: false, error: error };
  }
}

export async function updateStock(id: string, stockCount: number, inStock?: boolean) {
  try {
    const updateData: any = { stockCount };
    if (inStock !== undefined) {
      updateData.inStock = inStock;
    } else if (stockCount <= 0) {
      updateData.inStock = false;
    } else if (stockCount > 0) {
      updateData.inStock = true;
    }
    
    await db.update(productsTable).set(updateData).where(eq(productsTable.id, id));
    revalidatePath(`/products/${id}`);
    revalidatePath("/products");
    
    return { success: true };
  } catch (error) {
    console.error("[updateStock] Error:", error);
    return { success: false, error: error };
  }
}

export async function getProductStats() {
  try {
    const allProducts = await getProducts();
    const totalProducts = allProducts.length;
    const inStockProducts = allProducts.filter(p => p.inStock).length;
    const outOfStockProducts = totalProducts - inStockProducts;
    const totalValue = allProducts.reduce((sum, p) => sum + (p.price * p.stockCount), 0);
    const averageRating = allProducts.reduce((sum, p) => sum + p.rating, 0) / totalProducts || 0;
    
    return {
      totalProducts,
      inStockProducts,
      outOfStockProducts,
      totalValue,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  } catch (error) {
    console.error("[getProductStats] Error:", error);
    return null;
  }
}