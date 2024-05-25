import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { selectPartecipazioni } from "@/lib/backend/database";
import { DatabaseResponse } from "@/lib/backend/mysql";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const prenotazioneId = searchParams.get("prenotazioneId") as string;

  if (!prenotazioneId) return NextResponse.error();

  const res = await selectPartecipazioni(Number(prenotazioneId));

  if (res.ok) {
    return NextResponse.json(res);
  } else {
    console.error(res.body.message);
    return NextResponse.json(DatabaseResponse.error("Impossibile trovare le prenotazioni"));
  }
}
