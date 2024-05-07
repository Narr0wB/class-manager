"use client"

import { useCallback, useEffect, useState } from "react";
import { useRuleset } from "./HomeProvider";
import { AdminDashboard } from "./test/AdminDashboard"
import { PrenotazioneInfo } from "./test/admin";

const HomeClientAdmin: React.FC = () => {
  const [ruleset, setRuleset] = useRuleset();
  const [cachelist, setCachelist] = useState<PrenotazioneInfo[]>();

  const fetchData = useCallback(async (count: number, before: Date) => {

    const res = await fetch(
      `/api/database/prenotazione/admin/SELECT?count=${count}&ruleset=${JSON.stringify(ruleset)}&before=${before}`,
      { method: "GET" }
    );

    const prenotazioni: PrenotazioneInfo[] = await res.json();
    prenotazioni.forEach((pren) => {
      pren.data_ora_prenotazione = new Date(pren.data_ora_prenotazione);
      pren.data = new Date(pren.data);
    })

    return prenotazioni;
  }, [ruleset]);

  useEffect(() => {
    // fetch all the prenotazioni that match the ruleset rules
    setCachelist([]);

    fetchData(10, new Date()).then(result => setCachelist(result))

  }, [ruleset])

  return (
    cachelist ? 
    <div>
      <AdminDashboard
      prenotazioni={cachelist}
      defaultLayout = {undefined}
      defaultCollapsed = {false}
      navCollapsedSize={1000}
      >
      </AdminDashboard>
    </div> :
    <></>
  );
}

export default HomeClientAdmin;