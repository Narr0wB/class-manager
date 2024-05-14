import {
  Check,
  MoreVertical,
  Reply,
  Trash2,
  X,
} from "lucide-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PRENOTAZIONE_APPROVED, PRENOTAZIONE_REJECTED, PrenotazioneInfo, dash_rules, usePrenotazione } from "../../../../../../lib/backend/admin"
import { Badge } from "@/components/ui/badge"
import { ComponentProps } from "react"
import { useRuleset, useTrigger } from "../HomeProvider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface MailDisplayProps {
  prenotazione: PrenotazioneInfo | null
}

export function PrenotazioneDisplay({ prenotazione }: MailDisplayProps) {
  const [pren, setPren] = usePrenotazione();
  const [trigger, setTrigger] = useTrigger();
  const [ruleset, setRuleset] = useRuleset();

  const updateStatusCallback = async (status: number) => {
    const res = await fetch(
      "/api/database/prenotazione/CHANGESTATUS", {
      method: "POST",
      body: JSON.stringify({
        id: prenotazione!.id,
        status: status,
      })
    });

    setTrigger(prev => !prev);
    setPren({
      ...pren,
      selected: -1,
    });
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            {ruleset.dashRule != dash_rules.approvate &&
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!prenotazione} onClick={async () => { await updateStatusCallback(PRENOTAZIONE_APPROVED) }}>
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Approva</span>
                </Button>
              </TooltipTrigger>}
            <TooltipContent>Approva</TooltipContent>
          </Tooltip>
          <Tooltip>
            {ruleset.dashRule != dash_rules.rifiutate &&
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!prenotazione} onClick={async () => { await updateStatusCallback(PRENOTAZIONE_REJECTED) }}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Rifiuta</span>
                </Button>
              </TooltipTrigger>}
            <TooltipContent>Rifiuta</TooltipContent>
          </Tooltip>
          <AlertDialog>
            <AlertDialogTrigger disabled={!prenotazione}>
              <Button variant="ghost" size="icon" disabled={!prenotazione}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Elimina</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Eliminare?</AlertDialogTitle>
                <AlertDialogDescription>
                  Questa azione è irreversibile. Sicuri di volere procedere?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annulla</AlertDialogCancel>
                <AlertDialogAction onClick={async () => {
                  const res = await fetch(
                    "/api/database/prenotazione/DELETE", {
                    method: "POST",
                    body: JSON.stringify({
                      id: prenotazione!.id,
                    })
                  });

                  setPren({
                    ...pren,
                    selected: -1,
                  });

                  setTrigger(prev => !prev);
                }}>
                  Continua
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Tooltip>
          </Tooltip>
        </div>
      </div>
      <Separator />
      {
        prenotazione
          ? (
            <div className="flex flex-1 flex-col">
              <div className="flex p-4 justify-between">
                <div className="flex items-start gap-4 text-sm">
                  <Avatar>
                    <AvatarImage alt={prenotazione.name} />
                    <AvatarFallback>
                      {prenotazione.name
                        .split(" ")
                        .map((chunk) => chunk[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-semibold">{prenotazione.name}</div>
                    <div className="line-clamp-1 text-xs">{prenotazione.subject}</div>
                    <div className="line-clamp-1 text-xs">
                      <span className="font-medium">{"Prenotato per il: " + (prenotazione.data).toLocaleString("it-it", { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  {prenotazione.data && (
                    <div className="ml-auto text-xs text-muted-foreground">
                      {prenotazione.data_ora_prenotazione.toLocaleString("it-it", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  <div className="w-[50%] flex flex-col items-end justify-center">
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                {prenotazione.desc}
              </div>
              <Separator className="mt-auto" />
            </div>
          )
          : (
            <div className="p-8 text-center text-muted-foreground">
              Nessuna prenotazione selezionata
            </div>
          )}
    </div>
  )
}

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
