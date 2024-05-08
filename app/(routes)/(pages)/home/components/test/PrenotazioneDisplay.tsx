import {addDays} from "date-fns/addDays"
import {addHours} from "date-fns/addHours"
import {format} from "date-fns/format"
import { nextSaturday } from "date-fns/nextSaturday"
import {
  Check,
  MoreVertical,
  Reply,
  ReplyAll,
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
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PRENOTAZIONE_APPROVED, PRENOTAZIONE_REJECTED, PrenotazioneInfo, usePrenotazione } from "./admin"
import { Badge } from "@/components/ui/badge"
import { ComponentProps } from "react"
import { useTrigger } from "../HomeProvider"

interface MailDisplayProps {
  prenotazione: PrenotazioneInfo | null
}

export function PrenotazioneDisplay({ prenotazione }: MailDisplayProps) {
  const [pren, setPren] = usePrenotazione();
  const [trigger, setTrigger] = useTrigger();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!prenotazione} onClick={async () => {
              const res = await fetch(
                "/api/database/prenotazione/admin/CHANGE", {
                method: "POST",
                body: JSON.stringify({
                  id: prenotazione!.id,
                  status: PRENOTAZIONE_APPROVED,
                })
              });
              
              setTrigger(prev => !prev);
              setPren({
                ...pren,
                selected: -1,
              });
              
            }}>
                <Check className="h-4 w-4" />
                <span className="sr-only">Approva</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Approva</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!prenotazione} onClick={async () => {
              const res = await fetch(
                "/api/database/prenotazione/admin/CHANGE", {
                method: "POST",
                body: JSON.stringify({
                  id: prenotazione!.id,
                  status: PRENOTAZIONE_REJECTED,
                })
              });

              setPren({
                ...pren,
                selected: -1,
              });

              setTrigger(prev => !prev);
            }}>
                <X className="h-4 w-4" />
                <span className="sr-only">Rifiuta</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rifiuta</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!prenotazione}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Elimina</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Elimina</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            {/* {<Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={!prenotazione}>
                    <Clock className="h-4 w-4" />
                    <span className="sr-only">Snooze</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Snooze until</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Later today{" "}
                      <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Tomorrow
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      This weekend
                      <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Next week
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 7), "E, h:m b")}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <Calendar />
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>Snooze</TooltipContent>} */}
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!prenotazione}>
                <Reply className="h-4 w-4" />
                <span className="sr-only">Rispondi</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rispondi</TooltipContent>
          </Tooltip>
          {/* {<Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!prenotazione}>
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!prenotazione}>
                <Forward className="h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>} */}
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!prenotazione}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Altro</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Segna come non-letto</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {prenotazione ? (
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
                  <span className="font-medium">{"Prenotato per il: " + (prenotazione.data).toISOString().substring(0, 10)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              {prenotazione.data && (
                <div className="ml-auto text-xs text-muted-foreground">
                  {prenotazione.data_ora_prenotazione.toLocaleString("it-it", {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
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
          {/* <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${prenotazione.name}...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mute this
                    thread
                  </Label>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div> */}
        </div>
      ) : (
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
