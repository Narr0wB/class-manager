"use client"

import React, { createContext, SetStateAction, useContext, useState } from 'react';

type LayoutContextValue = {
  sheetOpen: boolean,
  setSheetOpen: React.Dispatch<SetStateAction<boolean>>,
  startMinutes: number,
  setStartMinutes: React.Dispatch<SetStateAction<number>>,
  endMinutes: number,
  setEndMinutes: React.Dispatch<SetStateAction<number>>
}

export const LayoutContext = createContext<LayoutContextValue>({
  sheetOpen: false,
  setSheetOpen: () => { },
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

type LayoutProviderProps = {
  children?: React.ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [startMinutes, setStartMinutes] = useState(13 * 60 + 30);
  const [endMinutes, setEndMinutes] = useState(14 * 60 + 30);

  const value = {
    sheetOpen: sheetOpen,
    setSheetOpen: setSheetOpen,
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