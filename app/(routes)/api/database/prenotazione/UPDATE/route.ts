import { updatePrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();
  
  const { ora_inizio, ora_fine, id } = await req.json();

  const res = await updatePrenotazione(ora_inizio, ora_fine, id);
  if (!res) return NextResponse.error();

  return NextResponse.json(res);
}