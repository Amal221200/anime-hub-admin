import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const UserAvatar = ({ imageLink, username }: { imageLink: string, username: string }) => {
    return (
        <Avatar className="h-5 w-5 sm:h-8 sm:w-8">
            <AvatarImage src={imageLink} alt={username} className="object-cover" />
            <AvatarFallback>
                {username[0].toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar