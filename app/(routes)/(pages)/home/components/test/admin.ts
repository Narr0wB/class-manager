import { atom, useAtom } from "jotai"
import { Prenotazione } from "@/lib/backend/database"

export type PrenotazioneUI = {
  prenotazione: Prenotazione,
  name: string,
  desc: string,
  subject: string,
  read: boolean,
  labels: string[]
}

type Config = {
  selected: PrenotazioneUI["prenotazione"]["id"] | null
}

const configAtom = atom<Config>({
  selected: 0,
})

export function usePrenotazione() {
  return useAtom(configAtom)
}

