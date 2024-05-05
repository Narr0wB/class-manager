import React, { useState } from 'react';
import Map from "@/app/(routes)/(pages)/home/components/map-section/Map";
import SaveDialog from '../SaveDialog';

type FloorProps = {
  className?: string;
  id: number;
}

const Floor: React.FC<FloorProps> = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.id[0] == "F") {
      console.log(`ID: ${target.id}`);
      setIsDialogOpen(true); // Open the dialog
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.id[0] == "F") {
      target.style.filter = "brightness(0.6)";
    }
  }

  function handleMouseUp(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.id[0] == "F") {
      target.style.filter = "brightness(0.8)";
    }
  }

  // FIX FILTER NOT APPLIED
  function handleTouchStartCapture(e: React.TouchEvent) {
    e.preventDefault(); //prevent double clicks
    const target = e.target as HTMLElement;
    if (target.id[0] == "F") {
      target.style.filter = "brightness(0.6)";
    }
  }

  function handleTouchEndCapture(e: React.TouchEvent) {
    e.preventDefault(); //prevent double clicks
    const target = e.target as HTMLElement;
    if (target.id[0] == "F") {
      target.style.filter = "none";
      console.log(`ID: ${target.id}`);
    }
  }

  // TODO: Fix bug because of which whenever a button is hovered on the map lags
  function handleMouseOver(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.id[0] == "F") {    
      const text = target.parentElement!.querySelector("text");

      if (text) { text.style.opacity = "0.5"; }
      target.style.filter = "brightness(0.8)";
    }
  }

  function handleMouseOut(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.id[0] == "F") {
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
      <SaveDialog open={[isDialogOpen, setIsDialogOpen]} />
    </>
  )
}

export default Floor;