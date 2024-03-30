import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { CalendarIcon, LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import router from "next/router"

type ProfileDrawerProps = {
    id?: string
    className?: string,
    profileName: string,
    image?: string
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ id, className, profileName, image }) => {
    return (
        <div id={id} className={className}>
            <DropdownMenu>
            <DropdownMenuTrigger className="">
            <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback className="bg-purple-600">{profileName[0]}</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div className="flex items-center">
                    <span className="pr-2">Le mie prenotazioni</span> 
                    <CalendarIcon className="w-5 h-5"></CalendarIcon>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {signOut(); router.replace("/login"); }}>
                    <div className="flex items-center">
                    <span className="pr-2">Log out</span> 
                    <LogOutIcon className="w-5 h-5"></LogOutIcon>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default ProfileDrawer;