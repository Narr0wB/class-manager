"use client"

import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import CustomTooltip from "@/components/custom/CustomTooltip"
import { useAdminSelectedSection } from "@/lib/backend/admin"

type NavProps = {
  links: {
    title: string
    icon: LucideIcon,
    separated?: boolean,
    action: () => void
  }[],
  collapsed?: boolean,
  width: number,
  collapsedWidth?: number,
  className?: string
}

export function Nav({ links, collapsed, width, collapsedWidth, className }: NavProps) {
  const [selected, setSelected] = useAdminSelectedSection();

  return (
    <nav key={selected.value} id="nav-bar" style={{ width: collapsed ? collapsedWidth : width }} className={cn("gap-2 pt-2", className)}>
      {
        links.map(link => {
          const button = (
            <Button
              variant={selected.value == link.title ? "default" : "ghost"}
              onClick={() => {
                link.action();
                setSelected({ value: link.title });
              }}
              className={cn("w-full flex", collapsed ? "justify-center" : "justify-start")}
            >
              <link.icon className={cn("size-4 shrink-0", collapsed ? "m-0" : "mr-2")} />
              {collapsed ? "" : link.title}
            </Button>
          );

          return (
            <div key={link.title} className="px-2">
              <Separator className={cn(link.separated ? "block" : "hidden", "mb-2")} />
              {
                collapsed ?
                  <CustomTooltip content={link.title}>
                    {button}
                  </CustomTooltip> :
                  button
              }
            </div>
          )
        })
      }
    </nav>
  )
}