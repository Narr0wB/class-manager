"use client"

import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useState } from "react"

type NavProps = {
  links: {
    title: string
    icon: LucideIcon
    action: () => void
  }[]
}

export function Nav({ links }: NavProps) {
  const [selected, setSelected] = useState(0);

  return (
    <nav className="grid gap-1 p-2">
      {
        links.map((link, index) => {
          return (
            <Button
              key={index}
              variant={selected == index ? "default" : "ghost"}
              onClick={() => {
                link.action();
                setSelected(index);
              }}
              className="justify-start"
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </Button>
          )
        })
      }
    </nav>
  )
}