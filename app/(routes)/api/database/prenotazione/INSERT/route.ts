import { IDfromEmail, PRENOTAZIONE_PENDING, Prenotazione, TimeFrame, insertPartecipazioni, insertPrenotazione, numberPrenotazioniUtente, selectPrenotazioneRangeCount } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import config from "@/public/config.json";
import { getLocaleDate } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const obj = await req.json() as any;
  const timeframe = obj.timeframe as TimeFrame;

  const prenotazioniCount = await selectPrenotazioneRangeCount(new Date(timeframe.data), timeframe.inizio, timeframe.fine, obj.id_aula);
  if (prenotazioniCount == undefined || prenotazioniCount != 0) return NextResponse.error();

  const user_id = await IDfromEmail(obj.user_email);
  if (!user_id) return NextResponse.error();

  const pren_user = await numberPrenotazioniUtente(user_id, getLocaleDate(new Date));
  if (pren_user > config.max.num_prenotazioni_utente - 1) return NextResponse.json(
    { error: "Hai già 3 prenotazioni attive! Se vuoi crearne una nuova prima eliminane una." },
    { status: 500 }
  );

  const prenotazione: Prenotazione = {
    id_utente: user_id,
    id_aula: obj.id_aula,
    data_ora_prenotazione: getLocaleDate(new Date()),
    data: getLocaleDate(new Date(timeframe.data)),
    status: PRENOTAZIONE_PENDING,
    ora_inizio: timeframe.inizio,
    ora_fine: timeframe.fine
  }

  const id_prenotazione = await insertPrenotazione(prenotazione);

  await insertPartecipazioni(id_prenotazione, obj.partecipazioni);

  return NextResponse.json({ id: id_prenotazione });
}
