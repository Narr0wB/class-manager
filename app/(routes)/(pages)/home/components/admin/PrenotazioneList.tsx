import PrenotazioneCard from "./PrenotazioneCard";
import { PrenotazioneInfo, usePrenotazione } from "../../../../../../lib/backend/admin";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Loading from "@/app/components/Loading";

interface PrenotazioneListProps {
  items: PrenotazioneInfo[],
  className?: string
}

export function PrenotazioneList({ items, className }: PrenotazioneListProps) {
  items = items.sort((a, b) => (a.data_ora_prenotazione < b.data_ora_prenotazione ? 1 : -1));
  const [prenotazione] = usePrenotazione();

  const gap = 8;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLElement[]>([]); // Array of refs for items

  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index];
    if (item && scrollRef.current) {
      // Get container and item positions relative to the viewport
      const containerRect = scrollRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Calculate vertical and horizontal offsets
      const verticalOffset = itemRect.top - containerRect.top + scrollRef.current.scrollTop;
      const horizontalOffset = itemRect.left - containerRect.left + scrollRef.current.scrollLeft;

      // Scroll the container to the target position in both axes (for different viewport sizes)
      scrollRef.current.scrollTo({
        top: verticalOffset,
        left: horizontalOffset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Wait to scroll until the array is populated
    if (items.length == 0) return;

    items.forEach((item, i) => {
      if (item.id && prenotazione.selected && item.id === prenotazione.selected) {
        scrollToItem(i);
      }
    });
  }, [items.length]);

  return (
    items.length != 0 ?
      <div
        id="prenotazione-list"
        ref={scrollRef}
        // Don't know if scroll-smooth changes something, the behaviour is also
        // defined in the scrolling function
        className={cn("flex flex-1 overflow-y-scroll p-4 pt-0 mx-2 scroll-smooth", `gap-${gap / 4}`, className)}
      >
        {
          items.map((item, index) => (
            <PrenotazioneCard
              ref={e => { if (e) itemRefs.current[index] = e; }}
              key={item.id}
              card={item}
            />
          ))
        }
      </div> :
      <div className="flex flex-1 items-center justify-center">
        <Loading />
      </div>
  );
}
