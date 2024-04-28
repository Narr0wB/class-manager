import { JSDOM } from "jsdom";
import { IDfromEmail, selectPrenotazioneRange, TimeFrame } from "./database";
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

export async function createSVGElement(map: Map, timeframe: TimeFrame, user_email: string, lightTheme: boolean) {
  const dom = new JSDOM(map.svg);
  const svgElement = dom.window.document.querySelector("svg") as SVGSVGElement;

  const meta = svgElement.getElementsByTagName("sodipodi:namedview")[0];
  meta.setAttribute("pagecolor", lightTheme ? LIGHT : DARK);
  meta.setAttribute("bordercolor", lightTheme ? LIGHT : DARK);

  const elements = svgElement.querySelectorAll("g");

  for (let i = 0; i < elements.length; i++) {
    const rect = elements[i].querySelector("rect");
    if (!rect) return;
    if (rect.id.includes("background")) {
      rect.style.fill = LIGHT // TODO: Put the primary color of the site
      return;
    }

    const button_key = rect.id.substring(4);
    let button_color = FREE;
    // This variable is needed to send specific information about a specific button to the client, i.e. if the button_client_code is "V" then the button is valid and signifies
    // a free classroom
    let button_client_code = "V";

    // Render only the rects that are in the json
    if (button_key in map.config) {
      const aula = (map.config as any)[button_key];

      // Fetch all the prenotazioni for that specifi aula that are in the same day and which start time is inbetween the time range that is 
      // specified in the timeframe

      const prenotazioni = await selectPrenotazioneRange(timeframe.data, timeframe.inizio, timeframe.fine, aula);
      
      if (prenotazioni?.length == 0) {
        button_color = FREE;
      }
      else if (prenotazioni?.at(0)?.id == await IDfromEmail(user_email)) {
        if (prenotazioni?.at(0)?.approvata) {
          button_color = APPROVED;
          button_client_code = "A";
        }
        else {
          button_color = PENDING;
          button_client_code = "P";
        }
      }
      else {
        button_color = BOOKED;
        button_client_code = "B"
      }
      

      rect.style.fill = button_color;
      rect.style.transition = "filter 0.1s ease";
      rect.id = "V" + rect.id; // TODO: Put the button client code and parse it correctly in the client side code
    }

    // Redundancy to reduce conditional checks
    if (lightTheme) {
      elements[i].querySelectorAll("path").forEach(path => {
        path.style.stroke = DARK;
        path.style.fill = DARK;
      });
    } else {
      elements[i].querySelectorAll("path").forEach(path => {
        path.style.stroke = LIGHT;
        path.style.fill = LIGHT;
      });
    }
  }

  return svgElement;
}