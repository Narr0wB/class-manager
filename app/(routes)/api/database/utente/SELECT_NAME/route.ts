import { selectUtentiNameLike } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const nameParam = searchParams.get("name") as string;

  if (!nameParam) return NextResponse.error();

  const nameSchema = z.string();
  const parser = await nameSchema.safeParseAsync(nameParam);
  if (!parser.success) return NextResponse.error();
  const name = parser.data;

  const res = await selectUtentiNameLike(name, session.user?.email!);

  return NextResponse.json(res);
}