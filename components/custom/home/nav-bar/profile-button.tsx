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
import { CalendarIcon, LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import CustomTooltip from "../../custom-tooltip"

type ProfileButton = {
  className?: string,
  profileName: string,
  image?: string
}

const ProfileButton: React.FC<ProfileButton> = ({ className, profileName, image }) => {
  return (
    <DropdownMenu>
      <CustomTooltip content="Profile" side="bottom">
        <DropdownMenuTrigger id="profile-button" className={cn(className, "")}>
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback className="bg-purple-600">{profileName[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </CustomTooltip>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CalendarIcon className="w-5 h-5"></CalendarIcon>
          <span className="pr-2">Le mie prenotazioni</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOutIcon className="w-5 h-5"></LogOutIcon>
          <span className="pr-2">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;