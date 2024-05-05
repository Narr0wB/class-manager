import { JSDOM } from "jsdom";
import { IDfromEmail, selectPrenotazioneRange, TimeFrame } from "./database";
import fs from "fs";

export const COLORS = {
  FREE: "#dac3e8",
  BOOKED: "#2b2d42",
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

export const BACKGROUND = {
  LIGHT: "#FFFFFF",
  DARK: "#030712"
}

// DO NOT CHANGE (its background0!!!)
const BACKGROUND_IDENTIFIER = "background";

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

export async function parseSVG(map: Map, timeframe: TimeFrame, userEmail: string, lightTheme: boolean) {
  const dom = new JSDOM(map.svg);
  const svgElement = dom.window.document.querySelector("svg") as SVGSVGElement;

  const meta = svgElement.getElementsByTagName("sodipodi:namedview")[0];
  meta.setAttribute("pagecolor", lightTheme ? THEMES.LIGHT : THEMES.DARK);
  meta.setAttribute("bordercolor", lightTheme ? THEMES.LIGHT : THEMES.DARK);

  const theme_background = lightTheme ? BACKGROUND.LIGHT : BACKGROUND.DARK;
  const groups = svgElement.querySelectorAll("g");

  for (let i = 0; i < groups.length; i++) {
    // Change the color of the structural paths (NOTE: The first g of the map is always the structural layer)
    groups[i].querySelectorAll("path").forEach(path => {
      path.style.stroke = lightTheme ? THEMES.DARK : THEMES.LIGHT;
      path.style.fill = lightTheme ? THEMES.DARK : THEMES.LIGHT;
    });

    const rects = groups[i].querySelectorAll("rect");
    const rect = rects[0];
    if (!rect) continue;

    // This is needed to be able to change the colour of "background" rects
    rects.forEach(rect => {
      if (rect.id.includes(BACKGROUND_IDENTIFIER)) {
        rect.style.fill = theme_background
      }
    });

    const button_text = groups[i].querySelector("text");

    // Remove "rect" and leave only the numerical id (i.e. 12, 13, 9, 1)
    rect.id = rect.id.substring(4);

    const btn = Button.free(rect.id);

    // Render only the rects that are in the json
    if (btn.id in map.config) {
      const aula = (map.config as any)[btn.id];

      if (button_text) {
        // TODO add new color for the text in dark mode
        button_text.style.fill = lightTheme ? THEMES.DARK : THEMES.DARK;
        button_text.style.fontFamily = "Roboto";
        button_text.style.pointerEvents = "none";
        const spans = button_text.querySelectorAll("tspan");
        spans[1].textContent = aula;
        spans[1].style.fontFamily = "Roboto";
        spans[1].style.fill = "#884DEE";
      }

      // Fetch all the prenotazioni for that specific aula that are in the same day
      // and which start time is in between the time range specified in the timeframe
      const prenotazioni = await selectPrenotazioneRange(timeframe.data, timeframe.inizio, timeframe.fine, aula);

      // Check if there are any prenotazioni in the specified timeframe and if so act accordingly
      if (prenotazioni && prenotazioni.length != 0) {
        if (prenotazioni.at(0)?.id == await IDfromEmail(userEmail)) {
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
      }

      rect.style.fill = btn.color;
      rect.style.transition = "filter 0.1s ease";
      rect.id = btn.code + rect.id;
    }

    // If the button is not in the config file, then is it deactivated. Still, its color has to be updated on any theme changes
    // as to not render the rects inside those buttons with a different color than the background
    else {
      if (button_text) button_text.style.fill = theme_background; 
      rect.style.fill = theme_background;
      rect.style.transition = "filter 0.1s ease";
    }
  };

  return svgElement;
}