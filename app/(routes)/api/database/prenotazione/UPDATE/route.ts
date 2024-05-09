import { updatePrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ora_inizio, ora_fine, id } = await req.json();

  const res = await updatePrenotazione(ora_inizio, ora_fine, id);
  if (!res) return NextResponse.error();

  return NextResponse.json(res);
}