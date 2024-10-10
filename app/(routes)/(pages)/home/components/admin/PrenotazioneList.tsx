import PrenotazioneCard from "./PrenotazioneCard"
import { PrenotazioneInfo, usePrenCardHeight, usePrenotazione } from "../../../../../../lib/backend/admin"
import { useEffect, useRef } from "react";

function calculateScrollPosition(
  itemHeight: number,
  gap: number,
  targetItemIndex: number
) {
  const targetItemPosition = targetItemIndex * (itemHeight + gap);
  return Math.max(0, targetItemPosition);
}

interface PrenotazioneListProps {
  items: PrenotazioneInfo[]
}

export function PrenotazioneList({ items }: PrenotazioneListProps) {
  items = items.sort((a, b) => { return (a.data_ora_prenotazione < b.data_ora_prenotazione) ? 1 : -1 });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [prenotazione, _] = usePrenotazione();
  const [prenCardHeight, __] = usePrenCardHeight();

  const gap = 8;

  // Handle the scroll
  useEffect(() => {
    if (!scrollRef.current) return;

    let target_index = 0;
    // Get the index of the selected prenotazione (to know how much to scroll)
    items.forEach((item, i) => {
      if (item.id && prenotazione.selected && item.id == prenotazione.selected) {
        target_index = i;
      }
    });

    scrollRef.current.scrollTo({
      top: calculateScrollPosition(prenCardHeight.height, gap, target_index),
      behavior: "smooth"
    });
  }, []);

  return (
    <div id="prenotazione-list" ref={scrollRef} className={`h-[75%] flex flex-col gap-[${gap}px] p-4 pt-0 overflow-y-scroll mx-2`}>
      {
        items.map(item =>
          <PrenotazioneCard key={item.id} card={item} />
        )
      }
    </div>
  )
}


