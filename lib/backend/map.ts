import { JSDOM } from "jsdom";
import { selectPrenotazioneRange, TimeFrame } from "./database";
import fs  from "fs";

export const [FREE, BOOKED, PENDING, APPROVED] = ["#b8b8b8", "#E90000", "#E9E900", "#008000"];
const [LIGHT, DARK] = ["#FFFFFF", "#000000"];

export type Map = {
  svg: string;
  config: JSON;
}

export function loadMap(map_path: string) {
  const config_path = map_path.replace(".svg", ".json");

  const result: Map = {
    svg: fs.readFileSync(map_path, "utf-8"),
    config: JSON.parse(fs.readFileSync(config_path, "utf-8"))
  }

  return result;
}

export function createSVGElement(map: Map, timeframe: TimeFrame, user_email: string, lightTheme: boolean): SVGSVGElement {
  const dom = new JSDOM(map.svg);
  const svgElement = dom.window.document.querySelector("svg") as SVGSVGElement;

  const meta = svgElement.getElementsByTagName("sodipodi:namedview")[0];
  meta.setAttribute("pagecolor", lightTheme ? LIGHT : DARK);
  meta.setAttribute("bordercolor", lightTheme ? LIGHT : DARK);

  // For each button
  svgElement.querySelectorAll("g").forEach(async (g) => {
    const rect = g.querySelector("rect");
    if (!rect) return;
    if (rect.id.includes("background")) {
      rect.style.fill = LIGHT // TODO: Put the primary color of the site
      return;
    }

    const button_key = rect.id.substring(4);
    const button_color = FREE;

    // Render only the rects that are in the json
    if (button_key in map.config) {
      const aula = (map.config as any)[button_key];

      // Fetch all the prenotazioni for that specifi aula that are in the same day and which start time is inbetween the time range that is 
      // specified in the timeframe

      const prenotazioni = await selectPrenotazioneRange(timeframe.data, timeframe.inizio, timeframe.fine, aula);
      console.log(prenotazioni)

      // if (prenotazioni.)
      

      rect.style.fill = button_color;
      rect.style.transition = "filter 0.1s ease";
      rect.id = "V" + rect.id;
    }

    // Redundancy to reduce conditional checks
    if (lightTheme) {
      g.querySelectorAll("path").forEach(path => {
        path.style.stroke = DARK;
        path.style.fill = DARK;
      });
    } else {
      g.querySelectorAll("path").forEach(path => {
        path.style.stroke = LIGHT;
        path.style.fill = LIGHT;
      });
    }
  });

  return svgElement;
}