import { TimeFrame } from '@/lib/backend/database';
import HourProvider from './input-section/HourProvider';
import FloorProvider from './map-section/FloorProvider';
import React, { createContext, SetStateAction, useContext, useState } from 'react';

type HomeContextValue = {
  timeframe: TimeFrame,
  setTimeframe: React.Dispatch<SetStateAction<TimeFrame>>
}

export const HomeContext = createContext<HomeContextValue>({
  timeframe: {data: new Date, inizio: 13 * 60 + 30, fine: 14 * 60 + 30},
  setTimeframe: () => {}
})

export function useTimeframe(): [TimeFrame, React.Dispatch<SetStateAction<TimeFrame>>] {
  let context = useContext(HomeContext);
  return [context.timeframe, context.setTimeframe];
}

type HomeProviderProps = {
  children?: React.ReactNode;
}

const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>({data: new Date, inizio: 13 * 60 + 30, fine: 14 * 60 + 30});

  const value = {
    timeframe: timeframe,
    setTimeframe: setTimeframe
  } satisfies HomeContextValue;

  return (
    <HomeContext.Provider value={ value }>
      {children}
    </HomeContext.Provider>
  )
}

export default HomeProvider;