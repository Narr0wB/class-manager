import { selectPrenotazioniUser } from "@/lib/backend/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const emailParam = searchParams.get("userEmail") as string;
  const dateParam = searchParams.get("date") as string | undefined;

  if (!emailParam) return NextResponse.error();

  console.log(`DATA_ROUTE: ${dateParam}`);

  const res = await selectPrenotazioniUser(emailParam, dateParam != null ? new Date(dateParam) : undefined);
  if (!res) return NextResponse.error();

  return NextResponse.json(res);
}