import React, { SetStateAction, createContext, useContext, useState } from 'react';

export const FLOORS = {
  FLOOR_0: 0,
  FLOOR_1: 1,
  FLOOR_2: 2,
  FLOOR_3: 3
}

type FloorContextValue = {
  floor: number,
  setFloor: React.Dispatch<SetStateAction<number>>
}

const FloorContext = createContext<FloorContextValue>({
  floor: FLOORS.FLOOR_0,
  setFloor: () => { }
});

export function useFloor(): [number, React.Dispatch<SetStateAction<number>>] {
  let context = useContext(FloorContext);
  return [context.floor, context.setFloor];
}

type FloorProviderProps = {
  children?: React.ReactNode;
}

const FloorProvider: React.FC<FloorProviderProps> = ({ children }) => {
  const [floor, setFloor] = useState(FLOORS.FLOOR_0);

  return (
    <FloorContext.Provider value={{ floor, setFloor }}>
      {children}
    </FloorContext.Provider>
  )
}

export default FloorProvider;