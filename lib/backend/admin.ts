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

type ConfigAdminSelected = {
  value: string
}

type ConfigPrenCardHeight = {
  height: number
}

const configAtom = atom<Config>({
  selected: 0,
})

const configAdminSelectedAtom = atom<ConfigAdminSelected>({
  value: "In arrivo"
})

const configPrenCardHeight = atom<ConfigPrenCardHeight>({
  height: 0
});

export function usePrenotazione() {
  return useAtom(configAtom)
}

export function useAdminSelectedSection() {
  return useAtom(configAdminSelectedAtom)
}

export function usePrenCardHeight() {
  return useAtom(configPrenCardHeight);
}

export type DashboardRule = {
  values: any[];
  sqlRule: string;
}

export type FilterRule = DashboardRule & {
  rule_id: number;
}

export type Ruleset = {
  dashRule: DashboardRule,
  filterSearch?: FilterRule,
  filterDateHourFrom?: FilterRule,
  filterDateHourTo?: FilterRule
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

export const FROM_DATE_HOUR_RULE = 1;
export const TO_DATE_HOUR_RULE = 2;
export const USER_RULE = 3;

export var filter_rules = {
  da_data_ora: {
    values: ["13:30"],
    sqlRule: "(CONCAT(data, \" \", ora_inizio) >= ?)",
    rule_id: FROM_DATE_HOUR_RULE
  },
  a_data_ora: {
    values: ["14:30"],
    sqlRule: "(CONCAT(data, \" \", ora_inizio) <= ?)",
    rule_id: TO_DATE_HOUR_RULE
  },
  da_utente: {
    values: ["nome", "email"],
    sqlRule: "(LOWER(nome) LIKE '%' + ? + '%' and ? IS NOT NULL)",
    rule_id: USER_RULE
  }
}

