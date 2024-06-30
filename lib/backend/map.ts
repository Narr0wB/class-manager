import { JSDOM } from "jsdom";
import { selectPrenotazioneRange, stringToTime, TimeFrame, timeToString } from "./database";
import fs from "fs";

export const COLORS = {
  FREE: "#dca2f5",
  BOOKED: "#9e50bf",
};

export const CODES = {
  FREE: "F",
  BOOKED: "B",
};

export const THEMES = {
  LIGHT: "#FFFFFF",
  DARK: "#000000"
};

export const BACKGROUND = {
  LIGHT: "#FFFFFF",
  DARK: "#030712"
}

export const TEXT = "#000000";

export const SEPARATOR = "*";

// DO NOT CHANGE 
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

export async function parseSVG(map: Map, timeframe: TimeFrame, lightTheme: boolean) {
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
      btn.code = btn.code + SEPARATOR + aula;

      if (button_text) {
        // TODO add new color for the text in dark mode
        button_text.style.fill = lightTheme ? THEMES.DARK : THEMES.DARK;
        button_text.style.pointerEvents = "none";
        const spans = button_text.querySelectorAll("tspan");
        spans[1].textContent = aula;
        spans[1].style.fill = TEXT;
      }

      // Fetch all the prenotazioni for that specific aula that are in the same day
      // and which start time is in between the time range specified in the timeframe
      const prenotazioni = await selectPrenotazioneRange(timeframe.data, timeframe.inizio, timeframe.fine, aula);
      
      // Check if there are any prenotazioni in the specified timeframe and if so act accordingly
      if (prenotazioni && prenotazioni.length != 0) {
        btn.color = COLORS.BOOKED;
        btn.code = CODES.BOOKED + SEPARATOR + aula + SEPARATOR + stringToTime(String(prenotazioni[0].ora_inizio)) + SEPARATOR + stringToTime(String(prenotazioni[0].ora_fine));
      }

      rect.style.fill = btn.color;
      rect.style.transition = "filter 0.1s ease";

      rect.id = btn.code;
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
