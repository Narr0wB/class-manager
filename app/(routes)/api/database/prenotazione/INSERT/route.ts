import { IDfromEmail, PRENOTAZIONE_PENDING, Prenotazione, TimeFrame, insertPartecipazioni, insertPrenotazione, numberPrenotazioniUtente, selectPrenotazioneRange } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { DatabaseResponse } from "@/lib/backend/mysql";
import config from "@/public/config.json";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const obj = await req.json() as any;
  const timeframe = obj.timeframe as TimeFrame;

  const res = await selectPrenotazioneRange(new Date(timeframe.data), timeframe.inizio, timeframe.fine, obj.id_aula)
  if (!res.ok) {
    console.error(res.body.message);
    return NextResponse.json(DatabaseResponse.error("Impossibile trovare le prenotazioni"));
  }

  const prenotazioni = res.body;

  if (prenotazioni.length != 0) {
    return NextResponse.json(DatabaseResponse.error("Nessuna prenotazione trovata"));
  }

  const user_id = await IDfromEmail(obj.user_email);
  if (!user_id) {
    return NextResponse.json(DatabaseResponse.error(`Impossibile trovare l'utente con l'email "${obj.user_email}"`));
  }

  const res2 = await numberPrenotazioniUtente(user_id, new Date());
  if (!res2.ok) {
    console.error(res2.body.message);
    return NextResponse.json(DatabaseResponse.error(`Impossibile trovare le prenotazione per l'utente con l'email "${obj.user_email}"`));
  }

  const prenCount = res2.body;

  // Count starts from 0
  if (prenCount > config.max.num_prenotazioni_utente - 1) {
    return NextResponse.json(DatabaseResponse.error("Hai già 3 prenotazioni attive! Se vuoi crearne una nuova prima eliminane una."));
  }

  const prenotazione: Prenotazione = {
    id_utente: user_id,
    id_aula: obj.id_aula,
    data_ora_prenotazione: new Date(new Date().getTime() + Math.abs((new Date().getTimezoneOffset() * 60000))),
    data: new Date(new Date(timeframe.data).getTime() + Math.abs((new Date(timeframe.data).getTimezoneOffset() * 60000))),
    status: PRENOTAZIONE_PENDING,
    ora_inizio: timeframe.inizio,
    ora_fine: timeframe.fine
  }

  const res3 = await insertPrenotazione(prenotazione);
  if (res3.ok) {
    const res4 = await insertPartecipazioni(res3.body, obj.partecipazioni);

    if (!res4.ok) {
      console.error(res4.body.message);
      return NextResponse.json(DatabaseResponse.error("Impossibile inserire i partecipanti"));
    }

    return NextResponse.json(res4);
  } else {
    console.error(res3.body.message);
    return NextResponse.json(DatabaseResponse.error("Impossibile inserire la prenotazione"));
  }
}
