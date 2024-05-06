import { IDfromEmail, Prenotazione, TimeFrame, insertPrenotazione } from "@/lib/backend/database";
import { formatHour } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const obj = await req.json() as any;

  const timeframe = obj.timeframe as TimeFrame;

  const user_id = await IDfromEmail(obj.user_email);
  if (!user_id) return NextResponse.error();

  const prenotazione: Prenotazione = {
    id_utente: user_id,
    id_aula: obj.id_aula,
    data: timeframe.data,
    approvata: false,
    ora_inizio: formatHour(timeframe.inizio),
    ora_fine: formatHour(timeframe.fine)
  }

  try {
    const res = await insertPrenotazione(prenotazione) as any;
    return NextResponse.json({ id: res.insertId });
  } catch (err: any) {
    console.error(`Database api error: ${err}`);
    return NextResponse.error();
  }
}