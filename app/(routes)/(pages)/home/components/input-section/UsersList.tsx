import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import React from "react";
import { usePartecipanti } from "../HomeProvider";

type UsersListProps = {
} & React.HTMLAttributes<HTMLUListElement>

const UsersList: React.FC<UsersListProps> = (props) => {
  const { className, ...others } = props;
  const { toast } = useToast();

  const [partecipanti, setPartecipanti] = usePartecipanti();

  return (
    <ul id="users-list" {...others} className={cn("grid grid-cols-[repeat(auto-fit,minmax(min-content,max_content))] auto-rows-[minmax(min-content,20px)] gap-2", className)}>
      <li className="size-fit">
        {
          partecipanti.map((partecipante, i) => (
            <Badge key={i} className="text-xs py-0 pl-0">
              <Button
                variant="ghost"
                onClick={() => {
                  // Remove the user from the partecipanti array
                  const updatedPartecipanti = partecipanti.filter(p => p.id !== partecipante.id);
                  setPartecipanti(updatedPartecipanti);
                  toast({
                    title: "Successo!",
                    description: (
                      // Don't change whitespaces
                      <>
                        Il partecipante
                        <span className="font-semibold"> {partecipante.email} </span>
                        è stato
                        <span className="text-red-500"> rimosso </span>
                        dalla prenotazione.
                      </>
                    )
                  });
                }}
                className="p-0 size-fit">
                <XIcon className="p-1" />
              </Button>
              {partecipante.email}
            </Badge>
          ))
        }
      </li>
    </ul>
  )
}

UsersList.displayName = "UsersList";

export default UsersList;