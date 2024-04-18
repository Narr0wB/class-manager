"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import CustomTooltip from "@/components/custom/CustomTooltip"
import { Button } from "@/components/ui/button"

type ThemeButtonProps = {
  className?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ className }) => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <CustomTooltip content="Tema" side="bottom">
        <DropdownMenuTrigger asChild>
          <Button id="theme-button" variant="ghost" className={cn(className, "")}>
            <Sun className="block dark:hidden" />
            <Moon className="hidden dark:block" />
          </Button>
        </DropdownMenuTrigger>
      </CustomTooltip>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default ThemeButton;