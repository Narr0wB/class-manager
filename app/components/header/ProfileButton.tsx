"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { CalendarIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import CustomTooltip from "@/components/custom/CustomTooltip"
import { useSheet } from "../LayoutProvider"

type ProfileButtonProps = {
  className?: string;
  admin: boolean;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ className, admin }) => {
  const { status, data } = useSession();
  const [_, setSheetOpen] = useSheet();

  const avatar = () => {
    switch (status) {
      case "loading":
        return <Skeleton className="w-10 h-10 rounded-full" />
      case "unauthenticated":
        return (
          <Avatar>
            <AvatarFallback className="bg-purple-600">P</AvatarFallback>
          </Avatar>
        )
      case "authenticated":
        return (
          <Avatar>
            <AvatarImage src={data.user?.image!} />
            <AvatarFallback className="bg-purple-600">{data.user?.name ? data.user.name[0] : "P"}</AvatarFallback>
          </Avatar>
        )
    }
  }

  const content = () => {
    switch (status) {
      case "loading":
        return <Skeleton className="w-10 h-10 rounded-full" />
      case "unauthenticated":
        return (
          <DropdownMenuItem onClick={() => redirect("/login")}>
            <LogInIcon className="w-5 h-5" />
            <span className="ml-2">Accedi</span>
          </DropdownMenuItem>
        )
      case "authenticated":
        return (
          <>
            {
              !admin &&
              <DropdownMenuItem onClick={() => setSheetOpen(true)} className="flex flex-row items-center justify-start">
                <CalendarIcon className="w-5 h-5" />
                <span className="ml-2">Le mie prenotazioni</span>
              </DropdownMenuItem >
            }
            <DropdownMenuItem onClick={() => signOut()} className="flex flex-row items-center justify-start">
              <LogOutIcon className="w-5 h-5"></LogOutIcon>
              <span className="ml-2">Esci</span>
            </DropdownMenuItem>
          </>
        )
    }
  }

  return (
    <DropdownMenu>
      <CustomTooltip content="Profilo" side="bottom">
        <DropdownMenuTrigger id="profile-button" className={cn(className, "")}>
          {avatar()}
        </DropdownMenuTrigger>
      </CustomTooltip>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profilo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {content()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;