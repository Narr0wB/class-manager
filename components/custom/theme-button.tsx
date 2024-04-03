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
import { Button } from "../ui/button"
import CustomTooltip from "./custom-tooltip"

type ThemeButtonProps = {
  className?: string;
  id?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ className, id }) => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <CustomTooltip content="Tema">
        <DropdownMenuTrigger>
          <Button id={id} className={cn(className, "")}>
            <Sun className="w-full h-full block dark:hidden" />
            <Moon className="w-full h-full hidden dark:block" />
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
    </DropdownMenu>
  )
}

export default ThemeButton;