"use client"

import * as React from "react"

import { Github } from "lucide-react"
import CustomTooltip from "./custom-tooltip"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import Link from "next/link"

type CreditsButtonProps = {
  className?: string;
}

const CreditsButton: React.FC<CreditsButtonProps> = ({ className }) => {
  return (
    <CustomTooltip content="Crediti" side="bottom">
      <Button id="credits-button" variant="ghost" className={cn(className, "")}>
        <Link href="https://github.com/Narr0wB/class-manager">
          <Github className="w-full h-full" />
        </Link>
      </Button>
    </CustomTooltip>
  )
}

export default CreditsButton;