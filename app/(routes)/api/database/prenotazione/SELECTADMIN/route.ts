import { selectPrenotazioneRuleset } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { DatabaseResponse } from "@/lib/backend/mysql";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);
  const countParam = searchParams.get("count") as string;
  const ruleParam = searchParams.get("ruleset") as string;
  const beforeParam = searchParams.get("before") as string;

  const ruleset = JSON.parse(ruleParam);
  const count = Number(countParam);
  const before = new Date(beforeParam);

  const res = await selectPrenotazioneRuleset(count, ruleset, before);
  if (!res) {
    return NextResponse.json(DatabaseResponse.error("Impossibile trovare le prenotazioni..."));
  };

  return NextResponse.json(res);
}