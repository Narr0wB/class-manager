"use client"

import React, { useState } from 'react';
import Map from "@/app/(routes)/(pages)/home/components/map-section/Map";
import SavePrenotazioneDialog from '../SavePrenotazioneDialog';
import { useMap } from '@/app/components/LayoutProvider';
// import { CODES, SEPARATOR } from '@/lib/backend/map';
import { minutesToString } from '@/lib/utils';
import InfoPrenotazioneDialog from '../InfoPrenotazioneDialog';

type FloorProps = {
  className?: string;
  id: number;
}

const Floor: React.FC<FloorProps> = ({ id }) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAula, setSelectedAula] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [renderMapFlag, _] = useMap();

  function getAulaInfo(rect: Element) {
    return rect.id.split("*");
  }

  function getAulaStatus(info: string[]) {
    return info[0];
  }

  function getAulaNumber(info: string[]) {
    return info[1];
  }

  function getAulaStart(info: string[]) {
    return minutesToString(Number(info[2]));
  }

  function getAulaEnd(info: string[]) {
    return minutesToString(Number(info[3]));
  }

  function handleSelectAula(e: React.MouseEvent | React.TouchEvent) {
    const target = e.target as HTMLElement;
    const info = getAulaInfo(target);
    const aula = getAulaNumber(info);
    if (!aula) return;
    const status = getAulaStatus(info);
    switch (status) {
      case "F": {
        setSelectedAula(aula.toString());
        setSaveDialogOpen(true);
        break;
      }
      case "B": {
        setStartHour(getAulaStart(info));
        setEndHour(getAulaEnd(info));
        setInfoDialogOpen(true);
        break;
      }
    }
  }

  function handleSelecting(e: React.MouseEvent | React.TouchEvent) {
    const target = e.target as HTMLElement;
    const info = getAulaInfo(target);
    if (getAulaStatus(info) == "F") {
      target.style.filter = "brightness(0.6)";
    } else if (getAulaStatus(info) == "B") {
      target.style.filter = "brightness(1.6)";
    }
  }

  function handleHover(e: React.MouseEvent | React.TouchEvent) {
    const target = e.target as HTMLElement;
    const info = getAulaInfo(target);
    const text = target.parentElement!.querySelector("text");
    if (text) text.style.opacity = "0.5";
    if (getAulaStatus(info) == "F") {
      target.style.filter = "brightness(0.8)";
    } else if (getAulaStatus(info) == "B") {
      target.style.filter = "brightness(1.1)";
    }
  }

  function handleLeave(e: React.MouseEvent | React.TouchEvent) {
    const target = e.target as HTMLElement;
    const text = target.parentElement!.querySelector("text");
    if (text) text.style.opacity = "1";
    target.style.filter = "none";
  }

  return (
    <>
      <Map
        key={Number(renderMapFlag)}
        floor={id}
        id={`floor-${id}`}
        onClick={handleSelectAula}
        onTouchEndCapture={handleSelectAula}

        onMouseDown={handleSelecting}
        onTouchStartCapture={handleSelecting}

        onMouseOver={handleHover}

        onMouseOut={handleLeave}
      />
      <SavePrenotazioneDialog
        open={[saveDialogOpen, setSaveDialogOpen]}
        aula={parseInt(selectedAula!)}
      />
      <InfoPrenotazioneDialog
        open={[infoDialogOpen, setInfoDialogOpen]}
        startHour={startHour}
        endHour={endHour}
      />
    </>
  )
}

export default Floor;