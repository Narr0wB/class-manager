import { selectUtentiNameLike } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get("email") as string;

  if (!emailParam) return NextResponse.error();

  const res = await selectUtentiNameLike(emailParam, session.user?.email!);

  return NextResponse.json(res);
}