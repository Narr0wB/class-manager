import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ProfileDrawerProps = {
    className?: string,
    profileName: string,
    image?: string
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ className, profileName, image }) => {
    return (
        <Avatar className={className}>
            <AvatarImage src={image} />
            <AvatarFallback className="bg-purple-600">{profileName[0]}</AvatarFallback>
        </Avatar>
    );
}

export default ProfileDrawer;