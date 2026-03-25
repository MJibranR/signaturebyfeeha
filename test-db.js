const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const { products } = require("./lib/schema.ts");

require("dotenv").config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: { cache: "no-store" },
});

const db = drizzle(sql);

async function test() {
  try {
    console.log("Testing database connection...");
    const result = await db.select().from(products);
    console.log("Success! Products found:", result.length);
    if (result.length > 0) {
      console.log("Sample product:", result[0]);
    } else {
      console.log("No products in database");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  process.exit(0);
}

test();
