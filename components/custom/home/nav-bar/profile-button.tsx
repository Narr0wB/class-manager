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

type ProfileButton = {
  className?: string,
}

const ProfileButton: React.FC<ProfileButton> = ({ className }) => {
  const session = useSession();

  type User = {
    name: string,
    image?: string | undefined
  }

  let user = null;

  if (session.status === "authenticated") {
    user = {
      name: session.data.user?.name!,
      image: session.data.user?.image!
    } satisfies User;
  }
  if (session.status === "unauthenticated") {
    user = {
      name: "P",
      image: undefined
    } satisfies User;
  }

  return (
    <DropdownMenu>
      <CustomTooltip content="Profilo" side="bottom">
        <DropdownMenuTrigger id="profile-button" className={cn(className, "")}>
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback className="bg-purple-600">{user?.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </CustomTooltip>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profilo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          session.status === "authenticated" ? (
            <>
              <DropdownMenuItem>
                <CalendarIcon className="w-5 h-5"></CalendarIcon>
                <span className="ml-2">Le mie prenotazioni</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOutIcon className="w-5 h-5"></LogOutIcon>
                <span className="ml-2">Log out</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={() => redirect("/login")}>
              <LogInIcon className="w-5 h-5"></LogInIcon>
              <span className="ml-2">Log in</span>
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;