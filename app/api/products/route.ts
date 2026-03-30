import { NextResponse } from "next/server";
import { getAllProductsAction } from "@/lib/actions/products";

export async function GET() {
  try {
    const products = await getAllProductsAction();
    return NextResponse.json(products ?? []);
  } catch {
    return NextResponse.json([]);
  }
}