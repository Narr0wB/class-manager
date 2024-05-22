import { TimeFrame } from '@/lib/backend/database';
import { getValidDate } from '@/lib/utils';
import React, { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import { dash_rules, Ruleset } from '../../../../../lib/backend/admin';

export type User = {
  id: number,
  email: string
};

type HomeClientContextValue = {
  timeframe: TimeFrame,
  setTimeframe: React.Dispatch<SetStateAction<TimeFrame>>,
  partecipanti: User[],
  setPartecipanti: React.Dispatch<SetStateAction<User[]>>
}

type HomeAdminContextValue = {
  ruleset: Ruleset,
  setRuleset: React.Dispatch<SetStateAction<Ruleset>>
}

type ControlContextValue = {
  trigger: boolean,
  setTrigger: React.Dispatch<SetStateAction<boolean>>
}

type ConfigContextValue = {
  config: JSON,
  setConfig: React.Dispatch<SetStateAction<JSON>>
}

export const HomeContext = createContext<HomeClientContextValue>({
  timeframe: { data: new Date(), inizio: 0, fine: 0 },
  setTimeframe: () => { },
  partecipanti: [],
  setPartecipanti: () => { }
});

export const AdminContext = createContext<HomeAdminContextValue>({
  ruleset: { dashRule: dash_rules.in_arrivo },
  setRuleset: () => { }
});

export const ControlContext = createContext<ControlContextValue>({
  trigger: false,
  setTrigger: () => { }
});

export const ConfigContext = createContext<ConfigContextValue>({
  config: JSON,
  setConfig: () => { }
});

export function useTimeframe(): [TimeFrame, React.Dispatch<SetStateAction<TimeFrame>>] {
  let context = useContext(HomeContext);
  return [context.timeframe, context.setTimeframe];
}

export function usePartecipanti(): [User[], React.Dispatch<SetStateAction<User[]>>] {
  let context = useContext(HomeContext);
  return [context.partecipanti, context.setPartecipanti];
}

export function useRuleset(): [Ruleset, React.Dispatch<SetStateAction<Ruleset>>] {
  let context = useContext(AdminContext);
  return [context.ruleset, context.setRuleset];
}

export function useTrigger(): [boolean, React.Dispatch<SetStateAction<boolean>>] {
  let context = useContext(ControlContext);

  return [context.trigger, context.setTrigger];
}

export function useConfig(): [JSON, React.Dispatch<SetStateAction<JSON>>] {
  let context = useContext(ConfigContext);

  return [context.config, context.setConfig];
}

type HomeProviderProps = {
  children?: React.ReactNode;
}

const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>({ data: getValidDate(), inizio: 13 * 60 + 30, fine: 14 * 60 + 30 });
  const [ruleset, setRuleset] = useState<Ruleset>({ dashRule: dash_rules.in_arrivo });
  const [trigger, setTrigger] = useState<boolean>(false);
  const [partecipanti, setPartecipanti] = useState<User[]>([]);

  const [config, setConfig] = useState<JSON>(JSON);
  useEffect(() => {
    const fetchConfig = async () => {
      const res = await fetch("/config.json", { method: "GET", });
      return await res.json();
    }
    fetchConfig().then(config => setConfig(config));
  }, []);

  const value = {
    timeframe: timeframe,
    setTimeframe: setTimeframe,
    partecipanti: partecipanti,
    setPartecipanti: setPartecipanti
  } satisfies HomeClientContextValue;

  const value2 = {
    ruleset: ruleset,
    setRuleset: setRuleset
  } satisfies HomeAdminContextValue;

  const value3 = {
    trigger: trigger,
    setTrigger: setTrigger
  } satisfies ControlContextValue;

  const value4 = {
    config: config,
    setConfig: setConfig
  } satisfies ConfigContextValue;

  return (
    <ControlContext.Provider value={value3}>
      <AdminContext.Provider value={value2}>
        <HomeContext.Provider value={value}>
          <ConfigContext.Provider value={value4}>
            {children}
          </ConfigContext.Provider>
        </HomeContext.Provider>
      </AdminContext.Provider>
    </ControlContext.Provider>
  )
}

export default HomeProvider;