// app/api/test-db/route.ts
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test the connection
    const result = await db.select().from(products).limit(1);
    return NextResponse.json({
      success: true,
      message: "Database connected!",
      hasProducts: result.length > 0,
      sampleProduct: result[0] || null
    });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}