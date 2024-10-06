import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import React from "react";
import { UsersUtility, getUserInfo } from "./UsersContainer";

type UsersListProps = {
} & Partial<UsersUtility> & React.HTMLAttributes<HTMLDivElement>

const UsersList: React.FC<UsersListProps> = (props) => {
  const { className, partecipanti, removePartecipante, addPartecipante, ...others } = props;

  return (
    <div id="users-list" className={cn("flex flex-wrap overflow-y-scroll gap-2 p-2", className)} {...others}>
      {
        partecipanti?.length != 0
          ? partecipanti?.map(partecipante => (
            <Badge key={partecipante.id} className="size-fit text-xs md:text-xl lg:text-base py-0 pl-0">
              <Button
                onClick={() => removePartecipante!(partecipante)}
                className="p-0 size-fit bg-transparent hover:bg-transparent">
                <XIcon className="p-1" />
              </Button>
              {getUserInfo(partecipante)}
            </Badge>
          ))
          : <div className="size-full content-center text-center text-xl md:text-3xl lg:text-xl">Nessun partecipante aggiunto...</div>
      }
    </div >
  )
}

UsersList.displayName = "UsersList";

export default UsersList;