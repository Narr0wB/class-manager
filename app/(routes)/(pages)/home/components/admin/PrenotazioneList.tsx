import { ScrollArea } from "@/components/ui/scroll-area"
import PrenotazioneCard from "./PrenotazioneCard"
import { PrenotazioneInfo } from "../../../../../../lib/backend/admin"

interface PrenotazioneListProps {
  items: PrenotazioneInfo[]
}

export function PrenotazioneList({ items }: PrenotazioneListProps) {
  items = items.sort((a, b) => { return (a.data_ora_prenotazione < b.data_ora_prenotazione) ? 1 : -1 });

  return (
    <ScrollArea>
      <div className="flex-grow flex flex-col gap-2 p-4 pt-0">
        {
          items.map((item, i) =>
            <PrenotazioneCard key={i} card={item} />
          )
        }
      </div>
    </ScrollArea>
  )
}


