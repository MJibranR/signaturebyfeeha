import { NextResponse } from "next/server";
import { getImageFiles } from "@/lib/actions/files";

export async function GET() {
  const images = await getImageFiles();
  return NextResponse.json(images);
}