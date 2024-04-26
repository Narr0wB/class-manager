import { INSERT_Prenotazione, Prenotazione } from "@/lib/backend/database";
import { spliceSVG } from "@/lib/backend/files";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const prenotazione = await req.json() as Prenotazione;

  const res = await INSERT_Prenotazione(prenotazione) as any;


  return NextResponse.json({ id: res.insertId });
}