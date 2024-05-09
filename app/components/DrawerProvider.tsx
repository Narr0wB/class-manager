"use client"

import React, { createContext, SetStateAction, useContext, useState } from 'react';

type DrawerContextValue = {
  open: boolean,
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

export const DrawerContext = createContext<DrawerContextValue>({
  open: false,
  setOpen: () => { }
})

export function useDrawer(): [boolean, React.Dispatch<SetStateAction<boolean>>] {
  let context = useContext(DrawerContext);
  return [context.open, context.setOpen];
}

type DrawerProviderProps = {
  children?: React.ReactNode;
}

const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const value = {
    open: open,
    setOpen: setOpen
  } satisfies DrawerContextValue;

  return (
    <DrawerContext.Provider value={value}>
      {children}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider;