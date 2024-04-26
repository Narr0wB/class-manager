import { JSDOM } from "jsdom";

export const [FREE, BOOKED, PENDING, APPROVED] = ["#808080", "#FF0000", "#FFFF00", "#008000"];
const [LIGHT, DARK] = ["#FFFFFF", "#000000"];

export function createSVGElement(content: string, lightTheme: boolean): SVGSVGElement {
  const dom = new JSDOM(content);
  const svgElement = dom.window.document.querySelector("svg") as SVGSVGElement;

  const meta = svgElement.getElementsByTagName("sodipodi:namedview")[0];
  meta.setAttribute("pagecolor", lightTheme ? LIGHT : DARK);
  meta.setAttribute("bordercolor", lightTheme ? LIGHT : DARK);

  svgElement.querySelectorAll("g").forEach(g => {
    const rect = g.querySelector("rect");
    if (rect) {
      rect.style.fill = FREE;
      rect.style.transition = "filter 0.1s ease";
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