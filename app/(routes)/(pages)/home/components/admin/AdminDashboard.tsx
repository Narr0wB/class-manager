"use client"

import * as React from "react"
import {
  CalendarIcon,
  Check,
  Inbox,
  Search,
  X,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { PrenotazioneDisplay } from "./PrenotazioneDisplay"
import { dash_rules, filter_rules, usePrenotazione } from "../../../../../../lib/backend/admin"
import { useState } from "react"
import { PrenotazioneInfo } from "../../../../../../lib/backend/admin"
import { useRuleset } from "../HomeProvider"
import { Nav } from "./Nav"
import FiltersDropdown from "./FiltersDropdown"
import { PrenotazioneList } from "./PrenotazioneList"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DisabledDaysPicker } from "./DisabledDaysPicker"

function setCookie(name: string, value: any) {
  document.cookie = `${name}=${JSON.stringify(value)}`;
}

type AdminDashboardProps = {
  prenotazioni: PrenotazioneInfo[]
}

export function AdminDashboard({ prenotazioni }: AdminDashboardProps) {
  const [prenotazione] = usePrenotazione()
  const [_, setRuleset] = useRuleset();
  const [selected, setSelected] = useState<"In arrivo" | "Approvate" | "Rifiutate" | "Calendario">("In arrivo");
  const defaultLayout = [250, 450, 660];

  return (
    <TooltipProvider>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => setCookie("react-resizable-panels:layout", sizes)}
        // Just like in HomeClient (full screen height - header height)
        className="max-h-[calc(100vh-5rem)] flex flex-row items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={20}>
          <Nav
            links={[
              {
                title: "In arrivo",
                icon: Inbox,
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.in_arrivo }));
                  setSelected("In arrivo");
                }
              },
              {
                title: "Approvate",
                icon: Check,
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.approvate }));
                  setSelected("Approvate");
                }
              },
              {
                title: "Rifiutate",
                icon: X,
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.rifiutate }));
                  setSelected("Rifiutate");
                }
              },
              {
                title: "Calendario",
                icon: CalendarIcon,
                action: () => {
                  setSelected("Calendario");
                }
              }]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {
          selected == "Calendario" ? <>
            <ResizablePanel defaultSize={defaultLayout[1] + defaultLayout[2]}>
              <DisabledDaysPicker />
            </ResizablePanel>
          </>
            : <>
              <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <div className="flex items-center justify-between px-4 py-2">
                  <h1 className="text-xl font-bold">{selected}</h1>
                  <FiltersDropdown />
                </div>
                <Separator />
                <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cerca per nome o per email"
                      onChange={(e) => {
                        let search_rule = filter_rules.da_utente;

                        search_rule.values[0] = e.target.value!;
                        search_rule.values[1] = e.target.value!;

                        if (e.target.value == "") {
                          setRuleset(prev => {
                            const new_ruleset = { ...prev, filterSearchRule: undefined };
                            return new_ruleset;
                          })
                        } else {
                          setRuleset(prev => {
                            const new_ruleset = { ...prev, filterSearchRule: search_rule };
                            return new_ruleset;
                          })
                        }
                      }}
                      className="pl-8"
                    />
                  </div>
                </div>
                <PrenotazioneList items={prenotazioni} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={defaultLayout[2]} minSize={20}>
                <PrenotazioneDisplay prenotazione={prenotazioni.find(item => item.id === prenotazione.selected)} />
              </ResizablePanel>
            </>
        }
      </ResizablePanelGroup >
    </TooltipProvider>
  )
}