import { IDfromEmail, PRENOTAZIONE_PENDING, Prenotazione, TimeFrame, insertPrenotazione, selectPrenotazioneRange } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { user_map } from "@/lib/backend/user";

const today = new Date();
today.setHours(0, 0, 0, 0);

let last_date: Date = today;

export async function POST(req: NextRequest) {

  if (last_date == undefined) last_date = new Date();

  if (( new Date().getTime() - last_date.getTime() ) > 24 * 60 * 60 * 1000) {
    last_date = new Date();
    user_map.clear();
  }

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const obj = await req.json() as any;
  const timeframe = obj.timeframe as TimeFrame;

  const prenotazioni = await selectPrenotazioneRange(new Date(timeframe.data), timeframe.inizio, timeframe.fine, obj.id_aula)
  if (prenotazioni?.length != 0) return NextResponse.error();

  const user_id = await IDfromEmail(obj.user_email);
  if (!user_id) return NextResponse.error();

  // More than 3 prenotazioni per day per user returns an error
  if (user_map.has(user_id)) {
    if (user_map.get(user_id)! > 2) return NextResponse.error();
  } else {
    user_map.set(user_id, 0);
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
  
  try {
    const res = await insertPrenotazione(prenotazione) as any;

    user_map.set(user_id, user_map.get(user_id)! + 1);

    return NextResponse.json({ id: res.insertId });
  } catch (err: any) {
    console.error(`Database api error: ${err}`);
    return NextResponse.error();
  }
}
