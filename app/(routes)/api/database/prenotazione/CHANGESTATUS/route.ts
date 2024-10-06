import { changeStatusPrenotazione, deletePrenotazione, IDfromPrenotazione, Prenotazione, selectPartecipazioni, selectPrenotazione, selectUtenteId, statusPrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { PRENOTAZIONE_APPROVED, PRENOTAZIONE_REJECTED } from "@/lib/backend/admin";
import { formatDate } from "@/lib/utils";

async function email(user_email: string, pren: Prenotazione) {
  const str = `u=infostudenti@liceocuneo.it&d=${user_email}&s=Prenotazione approvata!&c=La tua prenotazione per il giorno ${formatDate(pren.data)} dalle ${pren.ora_inizio} alle ${pren.ora_fine} nell'aula ${pren.id_aula} e' stata approvata.\nQuesto messaggio è stato automaticamente generato.`;
  const param = Buffer.from(str).toString("base64");
  fetch(process.env.EMAIL_URL + param, { method: "GET" });
  console.log(`URL: ${process.env.EMAIL_URL + param}`);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const post = await req.json();
  const pren_id = post.id;
  const status = post.status;

  const pren = await selectPrenotazione(pren_id);
  if (!pren) return NextResponse.error();

  const ret = await changeStatusPrenotazione(pren.id!, status);

  if (status == PRENOTAZIONE_APPROVED) {
    // send an email to each partecipante
    const user_id = await IDfromPrenotazione(pren.id!);
    const user = await selectUtenteId(user_id);
    if (user) {
      await email(user.email, pren);
    }

    const partecipanti = await selectPartecipazioni(pren.id!);
    if (partecipanti) {
      for (const p of partecipanti) {
        await email(p.email, pren);
      }
    }
  }

  if (status == PRENOTAZIONE_REJECTED) {
    setTimeout(async () => {
      const current_status = await statusPrenotazione(post.id);

      if (current_status == PRENOTAZIONE_REJECTED) {
        await deletePrenotazione(post.id);
      }
    }, 30 * 60 * 1000);
  }

  return NextResponse.json(ret);
}