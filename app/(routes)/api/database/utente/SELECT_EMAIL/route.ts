import { selectUtentiEmailLike } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get("email") as string;
  const sessionEmail = searchParams.get("sessionEmail") as string;

  if (!emailParam) return NextResponse.error();
  if (!sessionEmail) return NextResponse.error();

  const res = await selectUtentiEmailLike(emailParam, sessionEmail);

  return NextResponse.json(res);
}