import { updatePrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { DatabaseResponse } from "@/lib/backend/mysql";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { ora_inizio, ora_fine, id } = await req.json();

  const res = await updatePrenotazione(ora_inizio, ora_fine, id);
  if (res.ok) {
    return NextResponse.json(res);
  } else {
    console.error(res.body.message);
    return NextResponse.json(DatabaseResponse.error("Impossibile aggiornato la prenotazione"));
  }
}