"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomTooltip from "@/components/custom/CustomTooltip"

type ThemeDropdownProps = {
  children: React.ReactNode;
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({ children }) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <CustomTooltip content="Tema" side="bottom">
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
      </CustomTooltip>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Chiaro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Scuro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default ThemeDropdown;