import React, { useEffect, useState } from 'react';
import Map from "@/app/(routes)/(pages)/home/components/map-section/Map";
import SaveDialog from '../SaveDialog';

type FloorProps = {
  className?: string;
  id: number;
  configPath: string;
}

const Floor: React.FC<FloorProps> = ({ id, configPath }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAula, setSelectedAula] = useState<string | null>(null);
  const [config, setConfig] = useState<JSON | null>(null);

  // Get the json config file from the configPath
  useEffect(() => {
    fetch(configPath, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(config => {
        setConfig(config);
      })
  }, []);

  function getAulaStatus(rect: Element) {
    return rect.id[0];
  }

  function getAulaId(rect: Element) {
    return config ? config[rect.id[1] as keyof typeof config] : null;
  }

  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (getAulaStatus(target) == "F" && config) {

      // Get the number part of the rect ID and see to what aula it corresponds in the json file
      const aula = getAulaId(target);
      if (!aula) return;
      console.log(`Aula: ${aula}`);
      setSelectedAula(aula.toString());

      // Open the dialog
      setIsDialogOpen(true);
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (getAulaStatus(target) == "F") {
      target.style.filter = "brightness(0.6)";
    }
  }

  function handleMouseUp(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (getAulaStatus(target) == "F") {
      target.style.filter = "brightness(0.8)";
    }
  }

  // FIX FILTER NOT APPLIED
  function handleTouchStartCapture(e: React.TouchEvent) {
    e.preventDefault(); //prevent double clicks
    const target = e.target as HTMLElement;
    if (getAulaStatus(target) == "F") {
      target.style.filter = "brightness(0.6)";
    }
  }

  function handleTouchEndCapture(e: React.TouchEvent) {
    e.preventDefault(); //prevent double clicks
    const target = e.target as HTMLElement;
    if (getAulaStatus(target) == "F" && config) {
      target.style.filter = "none";

      // Get the number part of the rect ID and see to what aula it corresponds in the json file
      const aula = getAulaId(target);
      if (!aula) return;
      console.log(`Aula: ${aula}`);
      setSelectedAula(aula.toString());

      // Open the dialog
      setIsDialogOpen(true);
    }
  }

  // TODO: Fix bug because of which whenever a button is hovered on the map lags
  function handleMouseOver(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (getAulaStatus(target) == "F") {
      const text = target.parentElement!.querySelector("text");

      if (text) { text.style.opacity = "0.5"; }
      target.style.filter = "brightness(0.8)";
    }
  }

  function handleMouseOut(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (getAulaStatus(target) == "F") {
      const text = target.parentElement!.querySelector("text");

      if (text) { text.style.opacity = "1"; }
      target.style.filter = "none";
    }
  }

  return (
    <>
      <Map
        floor={id}
        id={`floor-${id}`}
        viewBox="300 0 800 1400"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStartCapture={handleTouchStartCapture}
        onTouchEndCapture={handleTouchEndCapture}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      {selectedAula && <SaveDialog open={[isDialogOpen, setIsDialogOpen]} aula={parseInt(selectedAula)} />}
    </>
  )
}

export default Floor;