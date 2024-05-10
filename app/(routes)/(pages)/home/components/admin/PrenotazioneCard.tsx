import { PrenotazioneInfo, usePrenotazione } from "@/lib/backend/admin";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ComponentProps } from "react";

function getRead(id: number): boolean {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.includes(id + '=')) {
      return Boolean(cookie.substring(String(id).length + 1));
    }
  }

  return false;
}

type PrenotazioneCardProps = {
  card: PrenotazioneInfo;
};

// Still need a better way to name this


const PrenotazioneCard: React.FC<PrenotazioneCardProps> = ({ card }) => {
  const [prenotazione, setPrenotazione] = usePrenotazione();

  card.read = getRead(card.id!);

  return (
    <button
      className={cn(
        "fade-in flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        prenotazione.selected === card.id && "bg-muted"
      )}
      onClick={() => {
        if (!card.read) {
          card.read = true;
          document.cookie = `${card.id}=true;path=/`;
        }

        setPrenotazione({
          ...prenotazione,
          // If already selected another will de-select it
          selected: prenotazione.selected == card.id ? -1 : card.id,
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
              prenotazione.selected === card.id
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {card.data_ora_prenotazione.toLocaleString("it-it", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) /* TODO: create a formatTimeFromNow function} */}
          </div>
        </div>
        <div className="text-xs font-medium">{card.subject}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {card.data.toLocaleString("it-it", { year: 'numeric', month: '2-digit', day: '2-digit' })}
      </div>
      {true ? (
        <div className="flex items-center gap-2">
          <Badge variant={getBadgeVariantFromLabel(card.label)}>
            {card.label}
          </Badge>
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

  return "secondary"
}