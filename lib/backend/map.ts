import { JSDOM } from "jsdom";
import { IDfromEmail, selectPrenotazioneRange, TimeFrame } from "./database";
import fs from "fs";

export const COLORS = {
  FREE: "#b8b8b8",
  BOOKED: "#E90000",
  PENDING: "#E9E900",
  APPROVED: "#008000"
};

export const CODES = {
  FREE: "F",
  BOOKED: "B",
  PENDING: "P",
  APPROVED: "A"
};

export const THEMES = {
  LIGHT: "#FFFFFF",
  DARK: "#000000"
};

const EMPTY_RECT_ID = "background";

export type Map = {
  svg: string;
  config: JSON;
}

class Button {
  id: string;
  color: string;
  code: string;

  constructor(id: string, color: string, code: string) {
    this.id = id,
      this.color = color,
      this.code = code
  }

  static fromRect(rect: SVGRectElement) {
    const code = rect.id[0];
    const id = rect.id.substring(1);

    let color;
    switch (code) {
      case CODES.FREE: {
        color = COLORS.FREE;
        break;
      }
      case CODES.BOOKED: {
        color = COLORS.BOOKED;
        break;
      }
      case CODES.PENDING: {
        color = COLORS.PENDING;
        break;
      }
      case CODES.APPROVED: {
        color = COLORS.APPROVED;
        break;
      }
      default: {
        color = COLORS.FREE;
        break;
      }
    }
    return new Button(id, color, code);
  }

  static free(id: string) {
    return new Button(id, COLORS.FREE, CODES.FREE);
  }
}

export function loadMap(mapPath: string): Map {
  const configPath = mapPath.replace(".svg", ".json");

  const map = {
    svg: fs.readFileSync(mapPath, "utf-8"),
    config: JSON.parse(fs.readFileSync(configPath, "utf-8"))
  } satisfies Map;

  return map;
}

function createSVGElement(svg: string) {
  const dom = new JSDOM(svg);
  return dom.window.document.querySelector("svg") as SVGSVGElement;
}

export async function parseSVG(map: Map, timeframe: TimeFrame, userEmail: string, lightTheme: boolean) {
  const svgElement = createSVGElement(map.svg);

  const meta = svgElement.getElementsByTagName("sodipodi:namedview")[0];
  meta.setAttribute("pagecolor", lightTheme ? THEMES.LIGHT : THEMES.DARK);
  meta.setAttribute("bordercolor", lightTheme ? THEMES.LIGHT : THEMES.DARK);

  const groups = svgElement.querySelectorAll("g");

  groups.forEach(async group => {
    const rect = group.querySelector("rect");
    if (!rect) return;
    if (rect.id.includes(EMPTY_RECT_ID)) {
      rect.style.fill = THEMES.LIGHT // TODO: Put the primary color of the website
      return;
    }

    // Remove "rect" and leave only the numerical id
    rect.id = rect.id.substring(3);

    const btn = Button.free(rect.id);
    console.log(btn);

    // Render only the rects that are in the json
    if (btn.id in map.config) {
      const aula = (map.config as any)[btn.id];

      // Fetch all the prenotazioni for that specific aula that are in the same day
      // and which start time is in between the time range specified in the timeframe
      const prenotazioni = await selectPrenotazioneRange(timeframe.data, timeframe.inizio, timeframe.fine, aula);
      if (!prenotazioni) return null;
      else if (prenotazioni.at(0)?.id == await IDfromEmail(userEmail)) {
        if (prenotazioni.at(0)?.approvata) {
          btn.color = COLORS.APPROVED;
          btn.code = CODES.APPROVED
        }
        else {
          btn.color = COLORS.PENDING;
          btn.code = CODES.PENDING
        }
      }
      else {
        btn.color = COLORS.BOOKED;
        btn.code = CODES.BOOKED
      }

      rect.style.fill = btn.color;
      rect.style.transition = "filter 0.1s ease";
      rect.id = btn.code + rect.id;
    }

    // Redundancy to reduce conditional checks
    if (lightTheme) {
      group.querySelectorAll("path").forEach(path => {
        path.style.stroke = THEMES.DARK;
        path.style.fill = THEMES.DARK;
      });
    } else {
      group.querySelectorAll("path").forEach(path => {
        path.style.stroke = THEMES.LIGHT;
        path.style.fill = THEMES.LIGHT;
      });
    }
  });

  return svgElement;
}