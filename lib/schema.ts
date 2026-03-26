import {
  pgTable, text, integer, boolean, timestamp, jsonb, serial
} from "drizzle-orm/pg-core";

// ─── Products ────────────────────────────────────────────────────────────────
export const products = pgTable("products", {
  id:          text("id").primaryKey(),
  name:        text("name").notNull(),
  brand:       text("brand").notNull(),
  price:       integer("price").notNull(),
  image:       text("image").notNull().default(""),
  rating:      integer("rating").notNull().default(5),
  reviews:     integer("reviews").notNull().default(0),
  size:        text("size").notNull().default("100ML"),
  topNotes:    text("top_notes").notNull().default(""),
  heartNotes:  text("heart_notes").notNull().default(""),
  baseNotes:   text("base_notes").notNull().default(""),
  category:    text("category").notNull().default("unisex"),
  inStock:     boolean("in_stock").notNull().default(true),
  stockCount:  integer("stock_count").notNull().default(10),
  shippingFee: integer("shipping_fee").notNull().default(0),
  createdAt:   timestamp("created_at").defaultNow(),
});

// ─── Orders ──────────────────────────────────────────────────────────────────
export const orders = pgTable("orders", {
  id:        text("id").primaryKey(),
  customer:  text("customer").notNull(),
  phone:     text("phone").notNull(),
  email:     text("email").notNull().default(""),   // ← ADD THIS
  product:   text("product").notNull(),
  qty:       integer("qty").notNull().default(1),
  amount:    integer("amount").notNull(),
  status:    text("status").notNull().default("Pending"),
  note:      text("note").notNull().default(""),
  date:      text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const reviews = pgTable("reviews", {
  id:     serial("id").primaryKey(),
  name:   text("name").notNull(),
  title:  text("title").notNull(),
  body:   text("body").notNull(),
  rating: integer("rating").notNull().default(5),
});

// ─── Settings ────────────────────────────────────────────────────────────────
// One row, key = "main"
export const settings = pgTable("settings", {
  key:          text("key").primaryKey(),
  announcement: text("announcement").notNull().default(""),
  storeName:    text("store_name").notNull().default("Signature by Feeha"),
  email:        text("email").notNull().default(""),
  phone:        text("phone").notNull().default(""),
  whatsapp:     text("whatsapp").notNull().default(""),
  address:      text("address").notNull().default(""),
  instagram:    text("instagram").notNull().default(""),
  facebook:     text("facebook").notNull().default(""),
  codEnabled:   boolean("cod_enabled").notNull().default(true),
  bankEnabled:  boolean("bank_enabled").notNull().default(true),
  jazzcashEnabled: boolean("jazzcash_enabled").notNull().default(true),
  freeShipping: boolean("free_shipping").notNull().default(true),
});

// ─── Pages content ───────────────────────────────────────────────────────────
// Stores JSON blobs per page key (faqs, about, privacy, terms, shipping, returns)
export const pagesContent = pgTable("pages_content", {
  key:     text("key").primaryKey(),   // e.g. "faqs", "about", "privacy"
  content: jsonb("content").notNull(), // full JSON for that page
});

// ─── Brands ──────────────────────────────────────────────────────────────────
export const brands = pgTable("brands", {
  id:    serial("id").primaryKey(),
  name:  text("name").notNull(),
  image: text("image").notNull().default(""),
  href:  text("href").notNull().default(""),
});

// ─── Users ────────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id:        serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName:  text("last_name").notNull(),
  email:     text("email").notNull().unique(),
  password:  text("password").notNull(),
  phone:     text("phone").notNull().default(""),
  created_at: timestamp("created_at").defaultNow(),  // ← match exactly
});

// ─── Contact Messages ─────────────────────────────────────────────────────────
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  reply: text("reply").default(""),
  repliedAt: timestamp("replied_at"),
  status: text("status").notNull().default("pending"), // pending, replied
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Homepage Settings ─────────────────────────────────────────────────────────
export const homepageSettings = pgTable("homepage_settings", {
  key: text("key").primaryKey(), // "main"
  config: jsonb("config").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Password Reset Tokens ─────────────────────────────────────────────────────────
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});