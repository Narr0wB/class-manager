import { TimeFrame } from '@/lib/backend/database';
import HourProvider from './input-section/HourProvider';
import FloorProvider from './map-section/FloorProvider';
import React, { createContext, SetStateAction, useContext, useState } from 'react';

type HomeContextValue = {
  timeframe: TimeFrame,
  setTimeframe: React.Dispatch<SetStateAction<TimeFrame>>
}

const HomeContext = createContext<HomeContextValue>({
  timeframe: {data: new Date, inizio: 0, fine: 0},
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
  const [timeframe, setTimeframe] = useState({data: new Date, inizio: 0, fine: 0});

  return (
    <HomeContext.Provider value={{ timeframe, setTimeframe }}>
      <HourProvider>
        <FloorProvider>
          {children}
        </FloorProvider>
      </HourProvider>
    </HomeContext.Provider>
  )
}

export default HomeProvider;