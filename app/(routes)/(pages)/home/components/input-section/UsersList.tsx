import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import React from "react";
import { usePartecipanti } from "../HomeProvider";
import { UsersUtility } from "./UsersContainer";

type UsersListProps = {
} & UsersUtility & React.HTMLAttributes<HTMLUListElement>

const UsersList: React.FC<UsersListProps> = (props) => {
  const { className, removePartecipante, addPartecipante, ...others } = props;
  const [partecipanti, _] = usePartecipanti();

  return (
    <ul id="users-list" className={cn("grid grid-cols-[repeat(auto-fit,minmax(min-content,max_content))] auto-rows-[minmax(min-content,20px)] gap-2", className)} {...others}>
      <li className="size-fit">
        {
          partecipanti.map((partecipante, i) => (
            <Badge key={i} className="text-xs py-0 pl-0">
              <Button
                variant="ghost"
                onClick={() => removePartecipante!(partecipante)}
                className="p-0 size-fit">
                <XIcon className="p-1" />
              </Button>
              {partecipante.email}
            </Badge>
          ))
        }
      </li>
    </ul >
  )
}

UsersList.displayName = "UsersList";

export default UsersList;