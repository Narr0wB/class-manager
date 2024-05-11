import { changeStatusPrenotazione, selectPrenotazioneRuleset, selectPrenotazioniUser } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();
  
  const post = await req.json();

  const ret = changeStatusPrenotazione(post.id, post.status);

  return NextResponse.json(ret);
}