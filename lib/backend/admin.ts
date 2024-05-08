import { atom, useAtom } from "jotai"
import { Prenotazione } from "@/lib/backend/database"

export type PrenotazioneInfo = Prenotazione & {
  name: string,
  desc: string,
  subject: string,
  read: boolean,
  label: string
}

type Config = {
  selected: PrenotazioneInfo["id"] | null
}

const configAtom = atom<Config>({
  selected: 0,
})

export function usePrenotazione() {
  return useAtom(configAtom)
}

export type DashboardRule = {
  values: any[];
  sqlRule: string;
}

export type FilterRule = DashboardRule

export type Ruleset = {
  dashRule: DashboardRule,
  filterSearch: FilterRule,
  filterDateFrom: FilterRule,
  filterDateTo: FilterRule,
  filterHourFrom: FilterRule,
  filterHourTo: FilterRule
}

export const PRENOTAZIONE_PENDING = 0;
export const PRENOTAZIONE_APPROVED = 1;
export const PRENOTAZIONE_REJECTED = 2;

export const dash_rules = {
  in_arrivo: {
    values: [PRENOTAZIONE_PENDING],
    sqlRule: "status = ?",
  },
  approvate: {
    values: [PRENOTAZIONE_APPROVED],
    sqlRule: "status = ?",
  },
  rifiutate: {
    values: [PRENOTAZIONE_REJECTED],
    sqlRule: "status = ?",
  }
};

export var filter_rules = {
  da_data: {
    values: [new Date()],
    sqlRule: "data >= ?",
  } satisfies FilterRule,
  a_data: {
    values: [new Date()],
    sqlRule: "data <= ?"
  },
  da_ora: {
    values: ["13:30"],
    sqlRule: "ora_inizio >= ?"
  },
  a_ora: {
    values: ["14:30"],
    sqlRule: "ora_inizio <= ?"
  },
  da_utente: {
    values: ["nome", "email"],
    sqlRule: "nome LIKE '%?%' OR email LIKE '%?%'"
  }
}
