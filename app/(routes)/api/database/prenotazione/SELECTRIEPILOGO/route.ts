import { selectPrenotazioneOn, selectUtenteId } from "@/lib/backend/database";
import { minutesToString } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.error();
 
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date") as string;

  const day = new Date(dateParam);
  const res = await selectPrenotazioneOn(day);
  
  if (!res) return NextResponse.json([]);

  const promises = res.map(async (prenotazione) => { 
    const utente = await selectUtenteId(prenotazione.id_utente); 

    if (utente == undefined) return;

    return {
      aula: prenotazione.id_aula, 
      prenotante: utente.nome, 
      orario: String(prenotazione.ora_inizio).slice(0, 5) + "-" + String(prenotazione.ora_fine).slice(0, 5),
      status: prenotazione.status,
      label: utente.classe
    };
  });

  const prenotazioni = await Promise.all(promises);

  return NextResponse.json(prenotazioni);
}
