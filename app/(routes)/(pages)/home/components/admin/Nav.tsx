"use client"

import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import CustomTooltip from "@/components/custom/CustomTooltip"

type NavProps = {
  links: {
    title: string
    icon: LucideIcon,
    separated?: boolean,
    action: () => void
  }[],
  sel: number,
  collapsed?: boolean
}

export function Nav({ links, sel, collapsed }: NavProps) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (sel) {
      setSelected(sel);
    }
  }, [sel]);

  return (
    <nav className="flex flex-col gap-2 p-2">
      {
        links.map((link, index) => {
          const button = (
            <Button
              variant={selected == index ? "default" : "ghost"}
              onClick={() => {
                link.action();
                setSelected(index);
              }}
              className={cn("w-full flex", collapsed ? "justify-center" : "justify-start")}
            >
              <link.icon className={cn("size-4 shrink-0", collapsed ? "m-0" : "mr-2")} />
              {collapsed ? "" : link.title}
            </Button>
          );

          return (
            <div key={link.title}>
              <Separator className={cn(link.separated ? "block" : "hidden", "mb-2")} />
              {
                collapsed ?
                  <CustomTooltip content={link.title}>
                    {button}
                  </CustomTooltip> :
                  <>
                    {button}
                  </>
              }
            </div>
          )
        })
      }
    </nav>
  )
}