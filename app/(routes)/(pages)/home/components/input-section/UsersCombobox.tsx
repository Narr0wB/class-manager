"use client"

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Button } from "../../../../../../components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "../../../../../../components/ui/command";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { User, usePartecipanti } from "../HomeProvider";
import { UsersUtility } from "./UsersContainer";

type UsersComboboxProps = {
} & UsersUtility & React.HTMLAttributes<HTMLDivElement>

async function getUsers(email: string) {
  const res = await fetch(
    `/api/database/utente/SELECT?email=${email}`, {
    method: "GET",
  });
  return await res.json() as User[];
}

const UsersCombobox: React.FC<UsersComboboxProps> = (props) => {
  const { toast } = useToast();

  const [partecipanti, setPartecipanti] = usePartecipanti();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const { className, removePartecipante, addPartecipante, ...others } = props;

  // Don't use the "includes" method because it doesn't necessarily work with objects
  const isUserPartecipante = (user: User) => partecipanti.some(partecipante => partecipante.id === user.id);

  return (
    <div id="users-combobox" className={cn("", className)} {...others}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            Partecipanti
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
            <CommandInput
              placeholder="Cerca utenti..."
              onValueChange={async value => value ? setUsers(await getUsers(value)) : setUsers([])}
            />
            <CommandEmpty className="py-2">
              {
                partecipanti.length != 0
                  ? partecipanti.map(partecipante => (
                    <div key={partecipante.id} className="text-start px-4">
                      {partecipante.email.trim()}
                    </div>
                  ))
                  : <div className="text-center">Nessun partecipante aggiunto</div>
              }
            </CommandEmpty>
            <CommandList>
              {
                users
                  .map(user => (
                    <CommandItem
                      key={user.id}
                      value={user.email.trim()}
                      onSelect={async email => {
                        // There will always be a user since I'm able to select the email item
                        const user = users.find(user => user.email === email.trim())!;

                        isUserPartecipante(user) ? removePartecipante!(user) : addPartecipante!(user);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isUserPartecipante(user) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {user.email.trim()}
                    </CommandItem>
                  ))
              }
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

UsersCombobox.displayName = "UsersCombobox";

export default UsersCombobox;