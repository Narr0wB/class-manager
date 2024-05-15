"use client"

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Button } from "../../../../../../components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "../../../../../../components/ui/command";
import { cn } from "@/lib/utils";

type User = {
  id: number,
  email: string
};

type UsersComboboxProps = {
  className?: string;
}

const UsersCombobox: React.FC<UsersComboboxProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const selectUsers = async (email: string) => {
    const res = await fetch(
      `/api/database/utente/SELECT?email=${email}`, {
      method: "GET",
    });
    return await res.json();
  };

  return (
    <div className={cn("", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            Utenti
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Cerca utenti..."
              onValueChange={async value => {
                setValue(value);
                value ? setUsers(await selectUsers(value)) : setUsers([]);
              }}
            />
            <CommandEmpty>Nessun utente trovato.</CommandEmpty>
            <CommandList>
              {
                users.map(user => (
                  <CommandItem
                    key={user.id}
                    value={user.email}
                    onSelect={setSelectedEmail}
                  >
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