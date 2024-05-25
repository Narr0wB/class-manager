import { selectPrenotazioniUser } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { DatabaseResponse } from "@/lib/backend/mysql";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get("userEmail") as string;
  const dateParam = searchParams.get("date") as string | null;

  if (!emailParam) return NextResponse.error();

  const res = await selectPrenotazioniUser(emailParam, dateParam ? new Date(dateParam) : null);
  if (res.ok) {
    return NextResponse.json(res);
  } else {
    console.error(res.body.message);
    return NextResponse.json(DatabaseResponse.error(`Impossibile trovare le prenotazioni per l'utente "${emailParam}"`))
  }
}