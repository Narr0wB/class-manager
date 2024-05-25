import { selectUtentiEmailLike } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { DatabaseResponse } from "@/lib/backend/mysql";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get("email") as string;

  if (!emailParam) return NextResponse.error();

  const res = await selectUtentiEmailLike(emailParam);
  if (res.ok) {
    return NextResponse.json(res);
  } else {
    console.error(res.body.message);
    return NextResponse.json(DatabaseResponse.error(`Impossibile trovare utenti con email simile a "${emailParam}"`))
  }
}