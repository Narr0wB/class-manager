import { changeStatusPrenotazione, deletePrenotazione, selectPrenotazioneRuleset, selectPrenotazioniUser } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const post = await req.json();

  const ret = deletePrenotazione(post.id);

  return NextResponse.json(ret);
}