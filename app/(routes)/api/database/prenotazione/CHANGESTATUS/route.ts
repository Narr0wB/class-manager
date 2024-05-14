import { changeStatusPrenotazione, deletePrenotazione, statusPrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { PRENOTAZIONE_REJECTED } from "@/lib/backend/admin";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();
  
  const post = await req.json();

  const ret = await changeStatusPrenotazione(post.id, post.status);

  if (post.status == PRENOTAZIONE_REJECTED) {
    setTimeout(async () => {
      const current_status = await statusPrenotazione(post.id);

      if (current_status == PRENOTAZIONE_REJECTED) {
        await deletePrenotazione(post.id);
      }
    }, 30 * 60 * 1000); 
  }

  return NextResponse.json(ret);
}