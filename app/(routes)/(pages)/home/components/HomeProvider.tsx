import { TimeFrame } from '@/lib/backend/database';
import { getValidDate } from '@/lib/utils';
import React, { createContext, SetStateAction, useContext, useState } from 'react';
import { dash_rules, Ruleset } from './test/admin';

type HomeClientContextValue = {
  timeframe: TimeFrame,
  setTimeframe: React.Dispatch<SetStateAction<TimeFrame>>
}

type HomeAdminContextValue = {
  ruleset: Ruleset,
  setRuleset: React.Dispatch<SetStateAction<Ruleset>>
}

export const HomeContext = createContext<HomeClientContextValue>({
  timeframe: { data: new Date(), inizio: 0, fine: 0 },
  setTimeframe: () => {}
})

export const AdminContext = createContext<HomeAdminContextValue>({
  ruleset: {dashRule: {values: [], sqlRule: "none"}, filterRules: []},
  setRuleset: () => {}
})

export function useTimeframe(): [TimeFrame, React.Dispatch<SetStateAction<TimeFrame>>] {
  let context = useContext(HomeContext);
  return [context.timeframe, context.setTimeframe];
}

export function useRuleset(): [Ruleset, React.Dispatch<SetStateAction<Ruleset>>] {
  let context = useContext(AdminContext);
  return [context.ruleset, context.setRuleset];
}

type HomeProviderProps = {
  children?: React.ReactNode;
}

const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>({ data: getValidDate(), inizio: 13 * 60 + 30, fine: 14 * 60 + 30 });
  const [ruleset, setRuleset] = useState<Ruleset>({dashRule: dash_rules.in_arrivo, filterRules: []});

  const value = {
    timeframe: timeframe,
    setTimeframe: setTimeframe
  } satisfies HomeClientContextValue;

  const value2 = {
    ruleset: ruleset,
    setRuleset: setRuleset
  } satisfies HomeAdminContextValue;

  return (
    <AdminContext.Provider value={value2}>
      <HomeContext.Provider value={value}>
        {children}
      </HomeContext.Provider>
    </AdminContext.Provider>
  )
}

export default HomeProvider;