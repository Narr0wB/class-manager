import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type HourContextValue = {
  start: number;
  setStart: React.Dispatch<React.SetStateAction<number>>;
  end: number;
  setEnd: React.Dispatch<React.SetStateAction<number>>;
};

const HourContext = createContext<HourContextValue>({
  start: 0,
  setStart: () => { },
  end: 0,
  setEnd: () => { }
});

export function useStartMinutes(): [number, Dispatch<SetStateAction<number>>] {
  const context = useContext(HourContext);
  return [context.start, context.setStart];
}

export function useEndMinutes(): [number, Dispatch<SetStateAction<number>>] {
  const context = useContext(HourContext);
  return [context.end, context.setEnd];
}

type HourProviderProps = {
  children?: React.ReactNode;
}

const HourProvider: React.FC<HourProviderProps> = ({ children }) => {
  const [start, setStart] = useState(13 * 60 + 30);
  const [end, setEnd] = useState(14 * 60 + 30);

  const value = {
    start: start,
    setStart: setStart,
    end: end,
    setEnd: setEnd
  } satisfies HourContextValue;

  return (
    <HourContext.Provider value={value}>
      {children}
    </HourContext.Provider>
  )
}

export default HourProvider;