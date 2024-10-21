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
import { cn } from "@/lib/utils"

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

  const defLayout = [50, 50];

  const [navCollapsed, setNavCollapsed] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const navLinks = [
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
  ];

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setNavCollapsed(window.innerWidth < 640);
    }

    // Call the handler as soon as the component loads
    handleResize();

    // Set up the event listener for resizing
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let resizable_content;
  if (selected.value == "Calendario") {
    resizable_content =
      <ResizablePanel
        id="resizable-calendar"
        defaultSize={defLayout[0] + defLayout[1]}
        minSize={(defLayout[0] + defLayout[1]) - 10}
      >
        <DisabledDaysPicker />
      </ResizablePanel>
  }
  else if (selected.value == "Riepilogo") {
    resizable_content =
      <ResizablePanel
        id="resizable-overview"
        defaultSize={defLayout[0] + defLayout[1]}
        minSize={(defLayout[0] + defLayout[1]) - 10}
      >
        <TaskProvider>
          <Tasks />
        </TaskProvider>
      </ResizablePanel>
  }
  else {
    resizable_content =
      <>
        <ResizablePanel
          id="resizable-list"
          defaultSize={defLayout[0]}
          minSize={defLayout[0] - 10}
          className="flex flex-col"
        >
          <div className="flex flex-0 items-center justify-between px-4 py-2">
            <h1 className="text-xl font-bold">{selected.value}</h1>
            <FiltersDropdown />
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cerca per nome o per email" onChange={handleInputChange} className="pl-8" />
            </div>
          </div>
          <PrenotazioneList items={prenotazioni} className={cn("flex", navCollapsed ? "flex-row" : "flex-col")} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          id="resizable-display"
          defaultSize={defLayout[1]}
          minSize={defLayout[1] - 10}
        >
          <PrenotazioneDisplay prenotazione={prenotazioni.find(item => item.id === prenotazione.selected)} />
        </ResizablePanel>
      </>
  }

  const navWidth = 200;
  const navCollapsedWidth = 50;

  return (
    <TooltipProvider>
      {/* Just like in HomeClient (full screen height - header height) */}
      <div id="main-content" className="w-dvw h-dvh flex flex-row max-h-[calc(100vh-5rem)]">
        <Nav
          collapsed={navCollapsed}
          sel={sections.indexOf(selected.value)}
          links={navLinks}
          width={navWidth}
          collapsedWidth={navCollapsedWidth}
          className="flex flex-col"
        />
        <Separator orientation="vertical" className="h-screen" />
        <ResizablePanelGroup
          id="resizables"
          direction={windowWidth < 640 ? "vertical" : "horizontal"}
          onLayout={(sizes: number[]) => setCookie("react-resizable-panels:layout", sizes)}
          className={`max-w-[calc(100vw-${navCollapsed ? navCollapsedWidth + 1 : navWidth + 1}px)] flex flex-row items-stretch`}
        >
          {resizable_content}
        </ResizablePanelGroup >
      </div>
    </TooltipProvider>
  )
}
