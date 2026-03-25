"use server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getOrders() {
  return await db.select().from(orders).orderBy(orders.createdAt);
}

export async function createOrder(data: typeof orders.$inferInsert) {
  await db.insert(orders).values(data);
  revalidatePath("/admin/orders");
}

export async function updateOrderStatus(id: string, status: string) {
  await db.update(orders).set({ status }).where(eq(orders.id, id));
  revalidatePath("/admin/orders");
}

export async function deleteOrder(id: string) {
  await db.delete(orders).where(eq(orders.id, id));
  revalidatePath("/admin/orders");
}