"use client"

import * as React from "react"
import {
  CalendarIcon,
  Check,
  Inbox,
  Search,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { PrenotazioneDisplay } from "./PrenotazioneDisplay"
import { dash_rules, filter_rules, usePrenotazione } from "../../../../../../lib/backend/admin"
import { useState } from "react"
import { PrenotazioneInfo } from "../../../../../../lib/backend/admin"
import { useRuleset } from "../HomeProvider"
import { Nav } from "./Nav"
import FiltersDropdown from "./FiltersDropdown"
import { PrenotazioneList } from "./PrenotazioneList"
import { Calendar } from '@/components/ui/calendar';

type AdminDashboardProps = {
  prenotazioni: PrenotazioneInfo[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

type BookingsRelatedProps = {
  title: string
}

export function AdminDashboard({
  prenotazioni,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: AdminDashboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const [prenotazione] = usePrenotazione()
  const [ruleset, setRuleset] = useRuleset();
  const [selected, setSelected] = useState<"In arrivo" | "Approvate" | "Rifiutate" | "Calendario">("In arrivo");

  function BookingsRelated({ title }: BookingsRelatedProps) {
    return (
      <>
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} className="flex flex-col">
          <div className="flex items-center justify-between px-4 py-2">
            <h1 className="text-xl font-bold">{title}</h1>
            <FiltersDropdown />
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cerca per nome o per email" className="pl-8" onChange={(e) => {
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
              }} />
            </div>
          </div>
          <PrenotazioneList items={prenotazioni} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <PrenotazioneDisplay prenotazione={prenotazioni.find(item => item.id === prenotazione.selected) || null} />
        </ResizablePanel>
      </>
    )
  }

  const content = () => {
    if (selected == "Calendario") {
      return (
        <ResizablePanel defaultSize={defaultLayout[1] + defaultLayout[2]} minSize={50} className="flex flex-col justify-center items-center">
          <Calendar
            mode="single"
            onSelect={date => {

            }}
            className="size-fit p-0"
          />
        </ResizablePanel>
      )
    } else {
      return <BookingsRelated title={selected} />
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        // Just like in HomeClient (full screen height - header height)
        className="max-h-[calc(100vh-5rem)] flex flex-row items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={30}
          onCollapse={() => {
            // Temporary workaround, look at it later
            const collapsed = false;
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )}`
          }}
          className={cn(
            isCollapsed &&
            "transition-all duration-300 ease-in-out fade-in"
          )}
        >
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "In arrivo",
                label: "",
                icon: Inbox,
                variant: "default",
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.in_arrivo }));
                  setSelected("In arrivo");
                }
              },
              {
                title: "Approvate",
                label: "",
                icon: Check,
                variant: "ghost",
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.approvate }));
                  setSelected("Approvate");
                }
              },
              {
                title: "Rifiutate",
                label: "",
                icon: X,
                variant: "ghost",
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.rifiutate }));
                  setSelected("Rifiutate");
                }
              },
              {
                title: "Calendario",
                label: "",
                icon: CalendarIcon,
                variant: "default",
                action: () => {
                  setSelected("Calendario");
                }
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {content()}
      </ResizablePanelGroup >
    </TooltipProvider >
  )
}
