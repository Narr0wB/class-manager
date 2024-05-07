import { selectPrenotazioneRuleset, selectPrenotazioniUser } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const countParam = searchParams.get("count") as string;
  const ruleParam = searchParams.get("ruleset") as string;
  const beforeParam = searchParams.get("before") as string;

  const ruleset = JSON.parse(ruleParam);
  const count = Number(countParam);
  const before = new Date(beforeParam);


  const res = await selectPrenotazioneRuleset(count, ruleset, before);
  if (!res) return NextResponse.error();

  return NextResponse.json(res);
}