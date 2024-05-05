import React from 'react';
import Map from "@/app/(routes)/(pages)/home/components/map-section/Map";

type FloorProps = {
  className?: string;
  id: number;
}

const Floor: React.FC<FloorProps> = ({ id }) => {
  function handleClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName == "rect" && target.id[0] == "F") {
      console.log(`ID: ${target.id}`);
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName == "rect" && target.id[0] == "F") {
      target.style.filter = "brightness(0.6)";
    }
  }

  function handleMouseUp(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName == "rect" && target.id[0] == "F") {
      target.style.filter = "brightness(0.8)";
    }
  }

  // FIX FILTER NOT APPLIED
  function handleTouchStartCapture(e: React.TouchEvent) {
    e.preventDefault(); //prevent double clicks
    const target = e.target as HTMLElement;
    if (target.tagName == "rect" && target.id[0] == "F") {
      target.style.filter = "brightness(0.6)";
    }
  }

  function handleTouchEndCapture(e: React.TouchEvent) {
    e.preventDefault(); //prevent double clicks
    const target = e.target as HTMLElement;
    if (target.tagName == "rect" && target.id[0] == "F") {
      target.style.filter = "none";
      console.log(`ID: ${target.id}`);
    }
  }

  function handleMouseOver(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName == "rect" && target.id[0] == "F") {
      target.style.filter = "brightness(0.8)";
    }
  }

  function handleMouseOut(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName == "rect" && target.id[0] == "F") {
      target.style.filter = "none";
    }
  }

  return (
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
  )
}

export default Floor;