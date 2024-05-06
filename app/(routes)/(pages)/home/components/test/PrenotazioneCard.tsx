import { Prenotazione } from "@/lib/backend/database"
import { PrenotazioneUI, usePrenotazione } from "./admin";
import { cn, formatHour } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ComponentProps } from "react";


type PrenotazioneCardProps = {
  card: PrenotazioneUI;
}

// Still need a better way to name this


const PrenotazioneCard: React.FC<PrenotazioneCardProps> = ({ card }) => {
    const [prenotazione, setPrenotazione] = usePrenotazione();

    return (
        <button
            key={card.prenotazione.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              prenotazione.selected === card.prenotazione.id && "bg-muted"
            )}
            onClick={() => {
              card.read = true;

              setPrenotazione({
                ...prenotazione,
                // If already selected another will de-select it
                selected: prenotazione.selected == card.prenotazione.id ? -1 : card.prenotazione.id,
              });
            }
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{card.name}</div>
                  {!card.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    prenotazione.selected === card.prenotazione.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {card.prenotazione.data_ora_prenotazione.toISOString().substring(0, 17) /* TODO: create a formatTimeFromNow function} */}
                </div>
              </div>
              <div className="text-xs font-medium">{card.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {formatHour(card.prenotazione.ora_inizio) + " - " + formatHour(card.prenotazione.ora_fine)}
            </div>
            {card.labels.length ? (
              <div className="flex items-center gap-2">
                {card.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
    );
}

export default PrenotazioneCard;

function getBadgeVariantFromLabel(
    label: string
  ): ComponentProps<typeof Badge>["variant"] {
    if (label.toLowerCase().includes("aula")) {
      return "default"
    }
  
    // if (["personal"].includes(label.toLowerCase())) {
    //   return "outline"
    // }
  
    return "secondary"
  }