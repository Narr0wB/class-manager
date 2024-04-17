import { Prenotazione, SELECTUtenteEmail, insertPrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const emailParam = searchParams.get("email") as string;

  if (!emailParam) NextResponse.error();

  const res = await SELECTUtenteEmail(emailParam) as any;

  return NextResponse.json(res);
}