import { SELECT_PrenotazioniUtente } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get("email") as string;
  const dataParam = searchParams.get("data");

  const res = await SELECT_PrenotazioniUtente(emailParam, dataParam ? new Date(dataParam) : null) as any;

  return NextResponse.json(res);
}