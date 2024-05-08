"use client"

import * as React from "react"
import {
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
// import { AccountSwitcher } from "@/app/(app)/examples/mail/components/account-switcher"
import { PrenotazioneDisplay } from "./PrenotazioneDisplay"
import { dash_rules, PRENOTAZIONE_PENDING, usePrenotazione } from "../../../../../../lib/backend/admin"
import { useState } from "react"
import { PrenotazioneInfo } from "../../../../../../lib/backend/admin"
import { useRuleset } from "../HomeProvider"
import { Nav } from "./Nav"
import FiltersDropdown from "./FiltersDropdown"

interface AdminDashboardProps {
  prenotazioni: PrenotazioneInfo[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
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

  // const prenotazione_list = [{id: 0, data_ora_prenotazione: new Date(), id_utente: 2, id_aula: 2, data: new Date("May 6, 2024, 6:14:30 PM"), status: PRENOTAZIONE_PENDING, ora_inizio: 100, ora_fine: 200, selected: 0, name: "Ilias El Fourati", desc: "eddi", subject: "gaming", read: false, label: "Aula 23"}];

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-100vh flex flex-row items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
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
            "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "In arrivo",
                label: "128",
                icon: Inbox,
                variant: "default",
                action: () => { setRuleset(prev => ({ ...prev, dashRule: dash_rules.in_arrivo })); }
              },
              {
                title: "Approvate",
                label: "9",
                icon: Check,
                variant: "ghost",
                action: () => { setRuleset(prev => ({ ...prev, dashRule: dash_rules.approvate })); }
              },
              {
                title: "Rifiutate",
                label: "",
                icon: X,
                variant: "ghost",
                action: () => { setRuleset(prev => ({ ...prev, dashRule: dash_rules.rifiutate })); }
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex items-center justify-between px-4 py-2">
            <h1 className="text-xl font-bold">Inbox</h1>
            <FiltersDropdown />
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <PrenotazioneDisplay
            prenotazione={prenotazioni.find((item) => item.id === prenotazione.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
