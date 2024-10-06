import { Utente, updateUtentiPrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const obj = await req.json() as any;
  const prenotazioneId = obj.id as number;
  const partecipanti = obj.partecipanti as Utente[];

  const ok = await updateUtentiPrenotazione(prenotazioneId, partecipanti);

  if (ok) return NextResponse.json({});
  else return NextResponse.error();
}
