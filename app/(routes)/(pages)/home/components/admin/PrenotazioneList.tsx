import { ComponentProps } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import PrenotazioneCard from "./PrenotazioneCard"
import { PrenotazioneInfo } from "../../../../../../lib/backend/admin"

interface PrenotazioneListProps {
  items: PrenotazioneInfo[]
}

export function PrenotazioneList({ items }: PrenotazioneListProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item, i) => (
          <PrenotazioneCard key={i} card={item} />
        ))}
      </div>
    </ScrollArea>
  )
}


