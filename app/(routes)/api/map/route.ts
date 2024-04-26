import { createSVGElement } from "@/lib/backend/map";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const srcParam = searchParams.get("src") as string;
  const themeParam = searchParams.get("theme") as string;

  if (!srcParam) return NextResponse.error();
  if (!themeParam) return NextResponse.error();

  const svgFileContent = fs.readFileSync(srcParam, "utf-8");
  const svgElement = createSVGElement(svgFileContent, themeParam == "light");

  return NextResponse.json(svgElement.innerHTML);
}