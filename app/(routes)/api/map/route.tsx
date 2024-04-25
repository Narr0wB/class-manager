import { INSERT_Prenotazione, Prenotazione } from "@/lib/backend/database";
import { spliceSVG } from "@/lib/backend/map";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const array = spliceSVG("/home/narrow/class-manager/public/pianoprimo.svg");

  return NextResponse.json({ data: array });
}