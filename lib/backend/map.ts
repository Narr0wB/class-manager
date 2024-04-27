import { JSDOM } from "jsdom";
import { TimeFrame } from "./database";
import fs  from "fs";

export const [FREE, BOOKED, PENDING, APPROVED] = ["#808080", "#E90000", "#E9E900", "#008000"];
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

export function createSVGElement(map: Map, timeframe: TimeFrame, lightTheme: boolean): SVGSVGElement {
  const dom = new JSDOM(map.svg);
  const svgElement = dom.window.document.querySelector("svg") as SVGSVGElement;

  const meta = svgElement.getElementsByTagName("sodipodi:namedview")[0];
  meta.setAttribute("pagecolor", lightTheme ? LIGHT : DARK);
  meta.setAttribute("bordercolor", lightTheme ? LIGHT : DARK);

  svgElement.querySelectorAll("g").forEach(g => {
    const rect = g.querySelectorAll("rect");
    if (rect.length < 2) {
      rect[0].style.fill = FREE;
      rect[0].style.transition = "filter 0.1s ease";
    } else {
      rect.forEach(rct => {
        rct.style.fill = FREE;
        rct.style.transition = "filter 0.1s ease";
      })
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