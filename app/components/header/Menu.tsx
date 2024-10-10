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
import { CalendarIcon, Code2Icon, InfoIcon, LogInIcon, LogOutIcon, MailIcon, MenuIcon, Moon, SettingsIcon, Sun } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import React, { useState } from "react"
import CustomTooltip from "@/components/custom/CustomTooltip"
import { useSheet } from "../LayoutProvider"
import { Button } from "@/components/ui/button"
import ThemeDropdown from "./ThemeDropdown"
import CreditsDialog from "./CreditsDialog"
import Link from "next/link"
import ContactsDialog from "./ContactsDialog"

function getPage() {
  if (typeof window == "undefined") return undefined;
  const parts = window.location.href.split("/");
  return parts[parts.length - 1].trim();
}

type ProfileButtonProps = {
  className?: string;
  admin: boolean;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ className, admin }) => {
  const { status, data } = useSession();
  const [_, setSheetOpen] = useSheet();
  const [creditsDialogOpen, setCreditsDialogOpen] = useState(false);
  const [contactsDialogOpen, setContactsDialogOpen] = useState(false);

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
          <Avatar className="size-7">
            <AvatarImage src={data.user?.image!} />
            <AvatarFallback className="bg-purple-600">{data.user?.name ? data.user.name[0] : "P"}</AvatarFallback>
          </Avatar>
        )
    }
  }

  const profile = () => {
    switch (status) {
      case "loading":
        return <Skeleton className="w-10 h-10 rounded-full" />
      case "unauthenticated":
        return (
          <DropdownMenuItem onClick={() => redirect("/login")}>
            <LogInIcon className="size-5" />
            <span className="ml-2">Accedi</span>
          </DropdownMenuItem>
        )
      case "authenticated":
        return (
          <>
            {
              !admin &&
              (getPage() == "login" || getPage() == "home") &&
              <DropdownMenuItem onClick={() => setSheetOpen(true)} className="flex flex-row items-center justify-start">
                <CalendarIcon className="size-5" />
                <span className="ml-2">Le mie prenotazioni</span>
              </DropdownMenuItem >
            }
            <DropdownMenuItem onClick={() => signOut()} className="flex flex-row items-center justify-start">
              <LogOutIcon className="size-5" />
              <span className="ml-2">Esci</span>
            </DropdownMenuItem>
          </>
        )
    }
  }

  return (
    <>
      <DropdownMenu>
        <CustomTooltip content="Menu" side="bottom">
          <DropdownMenuTrigger id="menu-button" asChild>
            <Button variant="ghost" className={cn(className, "size-fit aspect-square p-1")}>
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
        </CustomTooltip>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-row items-center">
            {avatar()}
            <span className="ml-2 underline">Profilo</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2">
            {profile()}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row items-center">
            <SettingsIcon className="size-6" />
            <span className="ml-2 underline">Impostazioni</span>
          </DropdownMenuLabel>
          <div className="px-2">
            <ThemeDropdown>
              <DropdownMenuItem>
                <Sun className="size-5 block dark:hidden" />
                <Moon className="size-5 hidden dark:block" />
                <span className="ml-2">Tema</span>
              </DropdownMenuItem>
            </ThemeDropdown>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex flex-row items-center">
            <InfoIcon className="size-6" />
            <span className="ml-2 underline">Informazioni</span>
          </DropdownMenuLabel>
          <div className="px-2">
            <DropdownMenuItem onClick={() => setCreditsDialogOpen(true)}>
              <Code2Icon className="size-5" />
              <span className="ml-2">Crediti</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setContactsDialogOpen(true)}>
              <MailIcon className="size-5" />
              <span className="ml-2">Contattaci</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu >
      <CreditsDialog open={[creditsDialogOpen, setCreditsDialogOpen]} />
      <ContactsDialog open={[contactsDialogOpen, setContactsDialogOpen]} />
    </>
  );
}

export default ProfileButton;
