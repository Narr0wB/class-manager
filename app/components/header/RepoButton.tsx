"use client"

import * as React from "react"

import { Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import CustomTooltip from "@/components/custom/CustomTooltip"
import { Button } from "@/components/ui/button"

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