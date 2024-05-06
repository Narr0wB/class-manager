import { atom, useAtom } from "jotai"
import { PrenotazioneUI } from "./PrenotazioneCard"

type Config = {
  selected: PrenotazioneUI["prenotazione"]["id"] | null
}

const configAtom = atom<Config>({
  selected: 0,
})

export function usePrenotazione() {
  return useAtom(configAtom)
}
