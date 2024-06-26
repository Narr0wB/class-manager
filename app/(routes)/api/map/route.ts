import { parseSVG, Map, loadMap } from "@/lib/backend/map";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { readTmpVar, writeTmpVar } from "@/lib/backend/tmp";

let FLOOR0: Map | undefined;
let FLOOR1: Map | undefined;
let FLOOR2: Map | undefined;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const { searchParams } = new URL(req.url);

  // When the client requests a map, i.e. they are trying to render it, we should receive
  // the current time frame object that is stored in the client
  // in order to render the appropriate colors
  const floorParam = searchParams.get("floor") as string;
  const themeParam = searchParams.get("theme") as string;
  const timeframeParam = searchParams.get("timeframe") as string;

  let selectedFloor;

  // Lazy loading: if it is the first time that a user requests the loading of the asset
  // then load it once and keep it saved in memory, so that subsequent calls
  // do not trigger a re-read of the file, which could be expensive
  switch (floorParam) {
    case "1": {
      if (!FLOOR0) {
        FLOOR0 = loadMap("./public/pianoprimo.svg");
      }

      selectedFloor = FLOOR0;
      break;
    }
    case "2": {
      if (!FLOOR1) {
        FLOOR1 = loadMap("./public/pianosecondo.svg");
      }

      selectedFloor = FLOOR1;
      break;
    }
    case "3": {
      if (!FLOOR2) {
        FLOOR2 = loadMap("./public/pianoterzo.svg");
      }

      selectedFloor = FLOOR2;
      break;
    }
    default: return NextResponse.error();
  }

  const timeframe = JSON.parse(timeframeParam);
  timeframe.data = new Date(timeframe.data);

  const svgElement = await parseSVG(selectedFloor!, timeframe, themeParam == "light");

  return NextResponse.json(svgElement.innerHTML);
}