"use server";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  const result = await db.select().from(products);
  console.log(`[getProducts] found: ${result.length} products`);
  if (result.length > 0) {
    console.log(`  → Sample: ${result[0].name}`);
  }
  return result;
}

export async function getProductsByCategory(category: string) {
  const result = await db.select().from(products).where(eq(products.category, category));
  console.log(`[getProductsByCategory] category: "${category}" | found: ${result.length} products`);
  if (result.length > 0) {
    console.log(`  → Sample: ${result[0].name} (category: ${result[0].category})`);
  }
  return result;
}

export async function getProductById(id: string) {
  const rows = await db.select().from(products).where(eq(products.id, id));
  return rows[0] ?? null;
}

export async function createProduct(data: typeof products.$inferInsert) {
  await db.insert(products).values(data);
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

export async function updateProduct(id: string, data: Partial<typeof products.$inferInsert>) {
  await db.update(products).set(data).where(eq(products.id, id));
  revalidatePath("/products");
  revalidatePath("/admin/products");
  revalidatePath(`/products/${id}`);
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/products");
  revalidatePath("/admin/products");
}