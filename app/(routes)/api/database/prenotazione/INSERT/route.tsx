import { Prenotazione, insertPrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const prenotazione = await req.json() as Prenotazione;

  const res = await insertPrenotazione(prenotazione) as any;

  return NextResponse.json({id: res.insertId});
}