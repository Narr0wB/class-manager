import { Prenotazione, insertPrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const prenotazione = await req.json() as Prenotazione;
  const formattedDate = prenotazione.data.toISOString().slice(0, 19).replace('T', ' ');

  const formattedPrenotazione: Prenotazione = {
    id: prenotazione.id,
    id_utente: prenotazione.id_utente,
    id_aula: prenotazione.id_aula,
    data: new Date(formattedDate),
    approvata: prenotazione.approvata
  };

  const res = await insertPrenotazione(prenotazione);

  return NextResponse.json({ res });
}