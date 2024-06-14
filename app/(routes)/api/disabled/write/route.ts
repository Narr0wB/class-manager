import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { writeFile } from "fs";

export async function POST(req: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.error();

  const isoDates = await req.json();

  writeFile(
    "public/disabled.json",
    JSON.stringify(isoDates),
    _ => NextResponse.error()
  );

  return NextResponse.json({});
}
