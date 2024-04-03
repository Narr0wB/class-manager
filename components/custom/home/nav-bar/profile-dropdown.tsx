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
import router from "next/router"
import CustomTooltip from "../../custom-tooltip"

type ProfileDropdownProps = {
  className?: string,
  profileName: string,
  image?: string
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ className, profileName, image }) => {
  return (
    <DropdownMenu>
      <CustomTooltip content="Profile" side="bottom">
        <DropdownMenuTrigger className={cn(className, "")}>
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
          <div className="flex items-center">
            <span className="pr-2">Le mie prenotazioni</span>
            <CalendarIcon className="w-5 h-5"></CalendarIcon>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { signOut(); router.replace("/login"); }}>
          <div className="flex items-center">
            <span className="pr-2">Log out</span>
            <LogOutIcon className="w-5 h-5"></LogOutIcon>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;