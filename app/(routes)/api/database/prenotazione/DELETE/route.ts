import { deletePrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const post = await req.json();

  const deleted = await deletePrenotazione(post.id) as boolean;
  if (!deleted) return NextResponse.error();

  return NextResponse.json(deleted);
}