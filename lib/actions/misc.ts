"use server";
import { db } from "@/lib/db";
import { reviews, settings, brands, pagesContent } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function getReviews() {
  return await db.select().from(reviews);
}

export async function createReview(data: typeof reviews.$inferInsert) {
  await db.insert(reviews).values(data);
  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

export async function updateReview(id: number, data: Partial<typeof reviews.$inferInsert>) {
  await db.update(reviews).set(data).where(eq(reviews.id, id));
  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

export async function deleteReview(id: number) {
  await db.delete(reviews).where(eq(reviews.id, id));
  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings() {
  const rows = await db.select().from(settings).where(eq(settings.key, "main"));
  return rows[0] ?? null;
}

export async function saveSettings(data: Omit<typeof settings.$inferInsert, "key">) {
  await db
    .insert(settings)
    .values({ key: "main", ...data })
    .onConflictDoUpdate({ target: settings.key, set: data });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export async function getBrands() {
  return await db.select().from(brands);
}

export async function createBrand(data: typeof brands.$inferInsert) {
  await db.insert(brands).values(data);
  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

export async function updateBrand(id: number, data: Partial<typeof brands.$inferInsert>) {
  await db.update(brands).set(data).where(eq(brands.id, id));
  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

export async function deleteBrand(id: number) {
  await db.delete(brands).where(eq(brands.id, id));
  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

// ─── Pages Content ───────────────────────────────────────────────────────────
// key is one of: "faqs" | "about" | "privacy" | "terms" | "shipping" | "returns"

export async function getPageContent(key: string) {
  const rows = await db.select().from(pagesContent).where(eq(pagesContent.key, key));
  return rows[0]?.content ?? null;
}

export async function savePageContent(key: string, content: unknown) {
  await db
    .insert(pagesContent)
    .values({ key, content })
    .onConflictDoUpdate({ target: pagesContent.key, set: { content } });
  revalidatePath(`/pages/${key}`);
  revalidatePath("/admin/pages");
}