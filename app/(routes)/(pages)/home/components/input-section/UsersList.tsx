import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import React from "react";
import { usePartecipanti } from "../HomeProvider";
import { UsersUtility } from "./UsersContainer";

type UsersListProps = {
} & Partial<UsersUtility> & React.HTMLAttributes<HTMLDivElement>

const UsersList: React.FC<UsersListProps> = (props) => {
  const { className, removePartecipante, addPartecipante, ...others } = props;
  const [partecipanti, _] = usePartecipanti();

  return (
    <div id="users-list" className={cn("flex flex-wrap gap-2", className)} {...others}>
      {
        partecipanti.map((partecipante, i) => (
          <Badge key={i} className="size-fit text-xs py-0 pl-0">
            <Button
              onClick={() => removePartecipante!(partecipante)}
              className="p-0 size-fit bg-transparent hover:bg-transparent">
              <XIcon className="p-1" />
            </Button>
            {partecipante.email}
          </Badge>
        ))
      }
    </div >
  )
}

UsersList.displayName = "UsersList";

export default UsersList;