"use client"

import React, { createContext, SetStateAction, useContext, useState } from 'react';

type SheetContextValue = {
  open: boolean,
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

export const HomeContext = createContext<SheetContextValue>({
  open: false,
  setOpen: () => { }
})

export function useSheet(): [boolean, React.Dispatch<SetStateAction<boolean>>] {
  let context = useContext(HomeContext);
  return [context.open, context.setOpen];
}

type SheetProviderProps = {
  children?: React.ReactNode;
}

const HomeProvider: React.FC<SheetProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const value = {
    open: open,
    setOpen: setOpen
  } satisfies SheetContextValue;

  return (
    <HomeContext.Provider value={value}>
      {children}
    </HomeContext.Provider>
  )
}

export default HomeProvider;