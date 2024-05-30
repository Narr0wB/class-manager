import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import React from "react";
import { usePartecipanti } from "../HomeProvider";
import { UsersUtility, getUserInfo } from "./UsersContainer";

type UsersListProps = {
} & Partial<UsersUtility> & React.HTMLAttributes<HTMLDivElement>

const UsersList: React.FC<UsersListProps> = (props) => {
  const { className, removePartecipante, addPartecipante, ...others } = props;
  const [partecipanti, _] = usePartecipanti();

  return (
    <div id="users-list" className={cn("flex flex-wrap overflow-y-scroll gap-2 p-2", className)} {...others}>
      {
        partecipanti.map(partecipante => (
          <Badge key={partecipante.id} className="size-fit text-xs py-0 pl-0">
            <Button
              onClick={() => removePartecipante!(partecipante)}
              className="p-0 size-fit bg-transparent hover:bg-transparent">
              <XIcon className="p-1" />
            </Button>
            {getUserInfo(partecipante)}
          </Badge>
        ))
      }
    </div >
  )
}

UsersList.displayName = "UsersList";

export default UsersList;