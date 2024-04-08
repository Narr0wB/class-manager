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
import CustomTooltip from "../../custom-tooltip"
import { redirect } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

type ProfileButtonProps = {
  className?: string,
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ className }) => {
  const { status, data } = useSession();

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
            <LogInIcon className="w-5 h-5"></LogInIcon>
            <span className="ml-2">Accedi</span>
          </DropdownMenuItem>
        )
      case "authenticated":
        return (
          <>
            <DropdownMenuItem>
              <CalendarIcon className="w-5 h-5"></CalendarIcon>
              <span className="ml-2">Le mie prenotazioni</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
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