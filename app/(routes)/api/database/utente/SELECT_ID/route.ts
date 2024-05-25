import { selectUtenteId } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { DatabaseResponse } from "@/lib/backend/mysql";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get("id") as string;

  if (!idParam) return NextResponse.error();

  const res = await selectUtenteId(Number(idParam));

  if (res.ok) {
    return NextResponse.json(res);
  } else {
    console.error(res.body.message);
    return NextResponse.json(DatabaseResponse.error(`Impossibile trovare l'utente con l'id ${idParam}`))
  }
}