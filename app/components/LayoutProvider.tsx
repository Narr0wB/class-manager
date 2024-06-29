"use client"

import config from "@/public/config.json";

import React, { createContext, SetStateAction, useContext, useState } from 'react';

type LayoutContextValue = {
  sheetOpen: boolean,
  setSheetOpen: React.Dispatch<SetStateAction<boolean>>,
  rerenderMapFlag: boolean,
  setRerenderMapFlag: React.Dispatch<SetStateAction<boolean>>,
  startMinutes: number,
  setStartMinutes: React.Dispatch<SetStateAction<number>>,
  endMinutes: number,
  setEndMinutes: React.Dispatch<SetStateAction<number>>
}

export const LayoutContext = createContext<LayoutContextValue>({
  sheetOpen: false,
  setSheetOpen: () => { },
  rerenderMapFlag: false,
  setRerenderMapFlag: () => { },
  startMinutes: 0,
  setStartMinutes: () => { },
  endMinutes: 0,
  setEndMinutes: () => { }
})

export function useSheet(): [boolean, React.Dispatch<SetStateAction<boolean>>] {
  const context = useContext(LayoutContext);
  return [context.sheetOpen, context.setSheetOpen];
}

export function useStartMinutes(): [number, React.Dispatch<SetStateAction<number>>] {
  const context = useContext(LayoutContext);
  return [context.startMinutes, context.setStartMinutes];
}

export function useEndMinutes(): [number, React.Dispatch<SetStateAction<number>>] {
  const context = useContext(LayoutContext);
  return [context.endMinutes, context.setEndMinutes];
}

export function useRerender(): () => void {
  const context = useContext(LayoutContext);
  const rerenderMap = () => {
    context.setRerenderMapFlag(prev => !prev);
  }
  return rerenderMap;
}

export function useMap(): [boolean, React.Dispatch<SetStateAction<boolean>>] {
  const context = useContext(LayoutContext);
  return [context.rerenderMapFlag, context.setRerenderMapFlag];
}

type LayoutProviderProps = {
  children?: React.ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [rerenderMapFlag, setRerenderMapFlag] = useState(false);
  const [startMinutes, setStartMinutes] = useState(config.min.ora_prenotazione * 60);
  const [endMinutes, setEndMinutes] = useState(config.min.ora_prenotazione * 60 + config.min.ore_durata_prenotazione * 60);

  const value = {
    sheetOpen: sheetOpen,
    setSheetOpen: setSheetOpen,
    rerenderMapFlag: rerenderMapFlag,
    setRerenderMapFlag: setRerenderMapFlag,
    startMinutes: startMinutes,
    setStartMinutes: setStartMinutes,
    endMinutes: endMinutes,
    setEndMinutes: setEndMinutes
  } satisfies LayoutContextValue;

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider;