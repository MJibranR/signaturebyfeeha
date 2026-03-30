// Run with: npx tsx lib/seed.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products, settings, reviews, brands } from "./schema";

// Product data as plain strings — no Next.js image imports
const productData = [
  {
    id: "creed-aventus",
    name: "Creed Aventus",
    brand: "Creed",
    price: 45000,
    image: "/images/perfume/creed-aventus.png",
    rating: 5,
    reviews: 120,
    size: "100ML",
    topNotes: "Pineapple, Bergamot, Apple, Blackcurrant",
    heartNotes: "Birch, Patchouli, Jasmine, Rose",
    baseNotes: "Musk, Oakmoss, Ambergris, Vanilla",
    category: "men",
    inStock: true,
    stockCount: 10,
    shippingFee: 0,
  },
  {
    id: "oud-wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    price: 38000,
    image: "/images/perfume/oud.png",
    rating: 5,
    reviews: 95,
    size: "100ML",
    topNotes: "Oud, Rosewood, Cardamom",
    heartNotes: "Sandalwood, Vetiver, Amber",
    baseNotes: "Tonka Bean, Vanilla, Musk",
    category: "men",
    inStock: true,
    stockCount: 8,
    shippingFee: 0,
  },
  {
    id: "gucci-ruches",
    name: "Gucci Ruches",
    brand: "Gucci",
    price: 22000,
    image: "/images/perfume/gucci-ruch.png",
    rating: 5,
    reviews: 60,
    size: "100ML",
    topNotes: "Peach, Bergamot, Pink Pepper",
    heartNotes: "Rose, Iris, Jasmine",
    baseNotes: "Patchouli, Musk, Sandalwood",
    category: "women",
    inStock: true,
    stockCount: 12,
    shippingFee: 0,
  },
  {
    id: "drift-aura",
    name: "Drift Aura",
    brand: "Lattafa",
    price: 7330,
    image: "/images/perfume/drift-aura.png",
    rating: 4,
    reviews: 40,
    size: "100ML",
    topNotes: "Citrus, Bergamot",
    heartNotes: "Oud, Rose",
    baseNotes: "Musk, Amber",
    category: "unisex",
    inStock: true,
    stockCount: 20,
    shippingFee: 0,
  },
];

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("🌱 Seeding database...");

  console.log("  → Inserting products...");
  for (const p of productData) {
    await db.insert(products).values(p).onConflictDoNothing();
  }

  console.log("  → Inserting default settings...");
  await db
    .insert(settings)
    .values({
      key:             "main",
      announcement:    "Please confirm order via phone/WhatsApp, orders not confirmed within 24 hours may be cancelled",
      storeName:       "Signature by Feeha",
      email:           "Scentsbysignature@gmail.com",
      phone:           "+92 303 3708804",
      whatsapp:        "923033708804",
      address:         "Sector 15-B, Buffer Zone, North Karachi, Karachi",
      instagram:       "https://www.instagram.com/signature_by_feeha/",
      facebook:        "https://www.facebook.com/profile.php?id=61586351197047",
      codEnabled:      true,
      bankEnabled:     true,
      jazzcashEnabled: true,
      freeShipping:    true,
    })
    .onConflictDoNothing();

  console.log("  → Inserting default reviews...");
  const defaultReviews = [
    { name: "Umar Jawaid",   title: "Awesome Fragrance",                     body: "A very exotic and spicy fragrance. Worth spending every rupee on it.", rating: 5 },
    { name: "Asim Ali",      title: "Finally Found a Reliable Perfume Store", body: "I had a great experience shopping at Signature by Feeha. Fast delivery and original products.", rating: 5 },
    { name: "Khurram Amin",  title: "Amazing CS Experience",                 body: "I had an absolutely amazing customer service experience. The team was so helpful.", rating: 5 },
    { name: "Sara Malik",    title: "Best Oud Collection",                   body: "The oud selection here is unmatched. Authentic, long-lasting and beautifully packaged.", rating: 5 },
    { name: "Bilal Qureshi", title: "Super Fast Delivery",                   body: "Ordered on Monday, received Tuesday. Packaging was premium.", rating: 5 },
    { name: "Hina Farooq",   title: "My Go-To Fragrance Store",              body: "I've ordered 4 times now and every single time the experience has been flawless.", rating: 5 },
  ];
  for (const r of defaultReviews) {
    await db.insert(reviews).values(r).onConflictDoNothing();
  }

  console.log("  → Inserting default brands...");
  const defaultBrands = [
    { name: "J.",      image: "/images/brands/Jj.png",      href: "/brands/Jj" },
    { name: "Lattafa", image: "/images/brands/lattafa.png",  href: "/brands/lattafa" },
    { name: "Rayhaan", image: "/images/brands/rayhaan.png",  href: "/brands/rayhaan" },
    { name: "Afnan",   image: "/images/brands/afnan.png",    href: "/brands/afnan" },
    { name: "Dunhill", image: "/images/brands/dunhill.png",  href: "/brands/dunhill" },
    { name: "Xerjoff", image: "/images/brands/xerjoff.png",  href: "/brands/xerjoff" },
    { name: "Dior",    image: "/images/brands/dior.png",     href: "/brands/dior" },
  ];
  for (const b of defaultBrands) {
    await db.insert(brands).values(b).onConflictDoNothing();
  }

  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});