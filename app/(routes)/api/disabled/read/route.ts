import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { readFile } from "fs/promises";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const jsonString = await readFile("public/disabled.json", "utf8");
  const dates = JSON.parse(jsonString).disabled as string[];

  return NextResponse.json(dates);
}
