import { TimeFrame } from "@/lib/backend/database";
import { createSVGElement, Map, loadMap } from "@/lib/backend/map";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

let FLOOR0: Map | undefined;
let FLOOR1: Map | undefined;
let FLOOR2: Map | undefined;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // When the client requests a map, i.e. they are trying to render it, we should receive the current time frame object that 
  // is stored in the client in order to render the appropriate colors
  const floor = searchParams.get("floor") as string;
  const theme = searchParams.get("theme") as string;
  const timeframe = searchParams.get("timeframe") as string;

  // if (!floor) return NextResponse.error();
  // if (!theme) return NextResponse.error();

  let selected_floor;

  // Lazy loading: if it is the first time a user request the loading of the asset, then load it once and keep it saved in memory, so 
  // that subsequent calls do not trigger a re-read of the file, which could be expensive
  switch (Number(floor)) {
    case 0: 
      if (!FLOOR0) {
        FLOOR0 = loadMap("./public/pianoprimo.svg");
      }

      selected_floor = FLOOR0; 
      break;
    case 1: 
      if (!FLOOR1) {
        FLOOR1 = loadMap("./public/pianoprimo.svg");
      }
      
      selected_floor = FLOOR1;
      break;
    case 2:
      if (!FLOOR2) {
        FLOOR2 = loadMap("./public/pianoprimo.svg");
      }
      
      selected_floor = FLOOR2;
      break;
    default: return NextResponse.error(); 
  }

  // TODO: convert timeframe from string to a TimeFrame object


  const svgElement = createSVGElement(selected_floor, {data: new Date(), inizio: 4, fine: 5}, theme == "light");

  return NextResponse.json(svgElement.innerHTML);
}