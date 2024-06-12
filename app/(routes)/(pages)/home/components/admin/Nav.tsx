"use client"

import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

type NavProps = {
  links: {
    title: string
    icon: LucideIcon,
    separated?: boolean,
    action: () => void
  }[]
}

export function Nav({ links }: NavProps) {
  const [selected, setSelected] = useState(0);

  return (
    <nav className="grid gap-1">
      {
        links.map((link, index) => {
          return (
            <>
              <Separator className={link.separated ? "block" : "hidden"} />
              <Button
                key={index}
                variant={selected == index ? "default" : "ghost"}
                onClick={() => {
                  link.action();
                  setSelected(index);
                }}
                className="justify-start mx-2 mt-1"
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Button>
            </>
          )
        })
      }
    </nav>
  )
}