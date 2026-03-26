// lib/server/db.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// This file should only be imported on the server
if (typeof window !== 'undefined') {
  throw new Error('This file can only be imported on the server');
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: { cache: "no-store" },
});

export const db = drizzle(sql);