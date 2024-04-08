"use client"

import * as React from "react"

import { Code2 } from "lucide-react"
import CustomTooltip from "../../custom-tooltip"
import { cn } from "@/lib/utils"
import { Button } from "../../../ui/button"
import Link from "next/link"

type RepoButtonProps = {
  className?: string;
}

const RepoButton: React.FC<RepoButtonProps> = ({ className }) => {
  return (
    <CustomTooltip content="Codice" side="bottom">
      <Button id="credits-button" variant="ghost" className={cn(className, "")}>
        <Link href="https://github.com/Narr0wB/class-manager">
          <Code2 className="" />
        </Link>
      </Button>
    </CustomTooltip>
  )
}

export default RepoButton;