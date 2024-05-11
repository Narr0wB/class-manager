import { selectUtenteEmail } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();
  
  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get("userEmail") as string;

  if (!emailParam) NextResponse.error();

  const res = await selectUtenteEmail(emailParam) as any;

  return NextResponse.json(res);
}