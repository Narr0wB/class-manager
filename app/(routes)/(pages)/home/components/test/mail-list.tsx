import { ComponentProps } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Prenotazione } from "@/lib/backend/database"
import PrenotazioneCard, { PrenotazioneUI } from "./PrenotazioneCard"

interface PrenotazioneListProps {
  items: PrenotazioneUI[]
}

export function PrenotazioneList({ items }: PrenotazioneListProps) {

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <PrenotazioneCard card={item}>

          </PrenotazioneCard>
        ))}
      </div>
    </ScrollArea>
  )
}


