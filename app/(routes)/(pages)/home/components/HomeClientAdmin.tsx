"use client"

import { useCallback, useEffect, useState } from "react";
import { useRuleset, useTrigger } from "./HomeProvider";
import { AdminDashboard } from "./admin/AdminDashboard"
import { PrenotazioneInfo } from "../../../../../lib/backend/admin";

const HomeClientAdmin: React.FC = () => {
  const [ruleset, setRuleset] = useRuleset();
  const [trigger, setTrigger] = useTrigger();
  const [cachelist, setCachelist] = useState<PrenotazioneInfo[]>();

  const fetchData = useCallback(async (count: number, before: Date) => {
    const res = await fetch(
      `/api/database/prenotazione/SELECTADMIN?count=${count}&ruleset=${JSON.stringify(ruleset)}&before=${before}`,
      { method: "GET" }
    );

    const prenotazioni: PrenotazioneInfo[] = await res.json();
    prenotazioni.forEach((pren) => {
      pren.data_ora_prenotazione = new Date(pren.data_ora_prenotazione);
      pren.data = new Date(pren.data);
    })

    return prenotazioni;
  }, [ruleset, trigger]);

  useEffect(() => {
    setCachelist([]);
    fetchData(100, new Date()).then(result => { setCachelist(result); });
  }, [ruleset, trigger])

  return (
    cachelist &&
    <AdminDashboard prenotazioni={cachelist} />
  );
}

export default HomeClientAdmin;
