import { IDfromEmail, PRENOTAZIONE_PENDING, Prenotazione, TimeFrame, insertPrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/(routes)/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const obj = await req.json() as any;

  const timeframe = obj.timeframe as TimeFrame;

  const user_id = await IDfromEmail(obj.user_email);
  if (!user_id) return NextResponse.error();

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
    return NextResponse.json({ id: res.insertId });
  } catch (err: any) {
    console.error(`Database api error: ${err}`);
    return NextResponse.error();
  }
}