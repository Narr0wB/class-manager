import { atom, useAtom } from "jotai"
import { Prenotazione } from "@/lib/backend/database"

export type PrenotazioneInfo = {
  id?: number;
  data_ora_prenotazione: Date;
  id_utente: number;
  id_aula: number;
  data: Date;
  approvata: boolean;
  ora_inizio: number,
  ora_fine: number,
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

