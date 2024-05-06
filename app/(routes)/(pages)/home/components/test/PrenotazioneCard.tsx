import { Prenotazione } from "@/lib/backend/database"
import { usePrenotazione } from "./use-mail";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ComponentProps } from "react";


type PrenotazioneCardProps = {
    card: PrenotazioneUI;
}

export type PrenotazioneUI = {
    prenotazione: Prenotazione,
    id: number,
    selected: number,
    name: string,
    text: string,
    subject: string,
    read: boolean,
    labels: string[]
}

const PrenotazioneCard: React.FC<PrenotazioneCardProps> = ({ card }) => {
    const [prenotazione, setPrenotazione] = usePrenotazione();

    return (
        <button
            key={card.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              prenotazione.selected === card.id && "bg-muted"
            )}
            onClick={() =>
              setPrenotazione({
                ...prenotazione,
                selected: card.id,
              })
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
                    prenotazione.selected === card.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  { "eddu"/* {formatDistanceToNow(new Date(card.date), {
                    addSuffix: true,
                  })} */}
                </div>
              </div>
              <div className="text-xs font-medium">{card.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {card.text.substring(0, 300)}
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
    if (["work"].includes(label.toLowerCase())) {
      return "default"
    }
  
    if (["personal"].includes(label.toLowerCase())) {
      return "outline"
    }
  
    return "secondary"
  }