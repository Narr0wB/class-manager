import { changeStatusPrenotazione, selectPrenotazioneRuleset, selectPrenotazioniUser } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const post = await req.json();

  const ret = changeStatusPrenotazione(post.id, post.status);

  return NextResponse.json(ret);
}