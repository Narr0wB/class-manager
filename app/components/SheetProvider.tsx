"use client"

import React, { createContext, SetStateAction, useContext, useState } from 'react';

type SheetContextValue = {
  open: boolean,
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

export const SheetContext = createContext<SheetContextValue>({
  open: false,
  setOpen: () => { }
})

export function useSheet(): [boolean, React.Dispatch<SetStateAction<boolean>>] {
  let context = useContext(SheetContext);
  return [context.open, context.setOpen];
}

type SheetProviderProps = {
  children?: React.ReactNode;
}

const SheetProvider: React.FC<SheetProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const value = {
    open: open,
    setOpen: setOpen
  } satisfies SheetContextValue;

  return (
    <SheetContext.Provider value={value}>
      {children}
    </SheetContext.Provider>
  )
}

export default SheetProvider;