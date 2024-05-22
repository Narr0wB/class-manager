import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { selectPartecipazioni } from "@/lib/backend/database";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const prenotazioneId = searchParams.get("prenotazioneId") as string;

  if (!prenotazioneId) return NextResponse.error();

  const partecipazioni = await selectPartecipazioni(Number(prenotazioneId));
  if (!partecipazioni) return NextResponse.error();

  return NextResponse.json(partecipazioni);
}
