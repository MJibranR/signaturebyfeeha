"use server";
import { db } from "@/lib/db";
import { pagesContent } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getPageData(key: string) {
  const rows = await db
    .select()
    .from(pagesContent)
    .where(eq(pagesContent.key, key));
  return rows[0]?.content ?? null;
}

export async function savePageData(key: string, content: unknown) {
  await db
    .insert(pagesContent)
    .values({ key, content })
    .onConflictDoUpdate({
      target: pagesContent.key,
      set: { content },
    });
}