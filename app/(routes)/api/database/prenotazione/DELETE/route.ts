import { deletePrenotazione, IDfromPrenotazione } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const post = await req.json();
  
  const ret = await deletePrenotazione(post.id) as any;
  // If the query didn't affect any rows aka the deletion didn't go trough
  if (ret.affectedRows != 1) return NextResponse.error();

  return NextResponse.json(ret);
}