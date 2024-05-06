import { Prenotazione, selectPrenotazioniUser } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get("userEmail") as string;
  const dateParam = searchParams.get("date") as string;

  if (!emailParam) return NextResponse.error();
  if (!dateParam) return NextResponse.error();

  const res = await selectPrenotazioniUser(emailParam, new Date(dateParam));
  if (!res) return NextResponse.error();

  return NextResponse.json(res);
}