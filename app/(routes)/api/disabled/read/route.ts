import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { readFile } from "fs/promises";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  let disabledDates: Date[] = [];

  const jsonString = await readFile("disabled.json", "utf8");
  disabledDates = JSON.parse(jsonString).disabled as Date[];

  return NextResponse.json(disabledDates);
}
