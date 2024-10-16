"use client"

import * as React from "react"
import {
  CalendarIcon,
  Check,
  EyeIcon,
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
import { dash_rules, filter_rules, useAdminSelectedSection, usePrenotazione } from "../../../../../../lib/backend/admin"
import { PrenotazioneInfo } from "../../../../../../lib/backend/admin"
import { useRuleset } from "../HomeProvider"
import { Nav } from "./Nav"
import FiltersDropdown from "./FiltersDropdown"
import { PrenotazioneList } from "./PrenotazioneList"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DisabledDaysPicker } from "./DisabledDaysPicker"
import Tasks from "./overview-section/Tasks"
import TaskProvider from "./overview-section/TaskProvider"

function setCookie(name: string, value: any) {
  document.cookie = `${name}=${JSON.stringify(value)}`;
}

type AdminDashboardProps = {
  prenotazioni: PrenotazioneInfo[]
}

const sections = [
  "In arrivo",
  "Approvate",
  "Rifiutate",
  "Calendario",
  "Riepilogo"
]

export function AdminDashboard({ prenotazioni }: AdminDashboardProps) {
  const [prenotazione] = usePrenotazione()
  const [_, setRuleset] = useRuleset();
  const [selected, setSelected] = useAdminSelectedSection();
  const defaultLayout = [20, 50, 30];
  const [leftCollapsed, setLeftCollapsed] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Set up the event listener for resizing
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let middle_panel;
  if (selected.value == "Calendario") {
    middle_panel =
      <ResizablePanel defaultSize={defaultLayout[1] + defaultLayout[2]} minSize={(defaultLayout[1] + defaultLayout[2]) - 10}>
        <DisabledDaysPicker />
      </ResizablePanel>
  }
  else if (selected.value == "Riepilogo") {
    middle_panel =
      <ResizablePanel defaultSize={defaultLayout[1] + defaultLayout[2]} minSize={(defaultLayout[1] + defaultLayout[2]) - 10}>
        <TaskProvider>
          <Tasks />
        </TaskProvider>
      </ResizablePanel>
  }
  else {
    middle_panel =
      <>
        <ResizablePanel className="flex flex-col" defaultSize={defaultLayout[1]} minSize={defaultLayout[1] - 10}>
          <div className="flex flex-0 items-center justify-between px-4 py-2">
            <h1 className="text-xl font-bold">{selected.value}</h1>
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
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={defaultLayout[2] - 10}>
          <PrenotazioneDisplay prenotazione={prenotazioni.find(item => item.id === prenotazione.selected)} />
        </ResizablePanel>
      </>
  }

  return (
    <TooltipProvider>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => setCookie("react-resizable-panels:layout", sizes)}
        // Just like in HomeClient (full screen height - header height)
        className="max-h-[calc(100vh-5rem)] flex flex-row items-stretch"
      >
        <ResizablePanel
          collapsible
          collapsedSize={5}
          onCollapse={() => setLeftCollapsed(true)}
          onExpand={() => setLeftCollapsed(false)}
          defaultSize={defaultLayout[0]}
          minSize={defaultLayout[0] - 10}
        >
          <Nav
            key={selected.value}
            collapsed={leftCollapsed}
            sel={sections.indexOf(selected.value)}
            links={[
              {
                title: "In arrivo",
                icon: Inbox,
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.in_arrivo }));
                  setSelected({ value: "In arrivo" });
                }
              },
              {
                title: "Approvate",
                icon: Check,
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.approvate }));
                  setSelected({ value: "Approvate" });
                }
              },
              {
                title: "Rifiutate",
                icon: X,
                action: () => {
                  setRuleset(prev => ({ ...prev, dashRule: dash_rules.rifiutate }));
                  setSelected({ value: "Rifiutate" });
                }
              },
              {
                title: "Calendario",
                icon: CalendarIcon,
                separated: true,
                action: () => {
                  setSelected({ value: "Calendario" });
                }
              },
              {
                title: "Riepilogo",
                icon: EyeIcon,
                action: () => {
                  setSelected({ value: "Riepilogo" });
                }
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {middle_panel}
      </ResizablePanelGroup >
    </TooltipProvider>
  )
}
