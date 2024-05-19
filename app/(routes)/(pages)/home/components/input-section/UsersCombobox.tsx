"use client"

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Button } from "../../../../../../components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "../../../../../../components/ui/command";
import { cn } from "@/lib/utils";
import { User, usePartecipanti } from "../HomeProvider";
import { UsersUtility } from "./UsersContainer";
import Spinner from "./Spinner";

type UsersComboboxProps = {
} & Partial<UsersUtility> & React.HTMLAttributes<HTMLDivElement>

async function getUsers(email: string) {
  const res = await fetch(
    `/api/database/utente/SELECT?email=${email}`, {
    method: "GET",
  });
  return await res.json() as User[];
}

// Don't use the "includes" method because it doesn't necessarily work with objects
const isUserPartecipante = (user: User, partecipanti: User[]) => partecipanti.some(partecipante => partecipante.id === user.id);

type UserItemProps = {
  user: User,
} & typeof CommandItem

const UserItem: React.FC<UserItemProps> = (props) => {
  const { user, ...others } = props;

  const [partecipanti, _] = usePartecipanti();

  return (
    <CommandItem
      key={user.id}
      value={user.email.trim()}
      {...others}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          isUserPartecipante(user, partecipanti) ? "opacity-100" : "opacity-0"
        )}
      />
      {user.email.trim()}
    </CommandItem>
  )
}

const UsersCombobox: React.FC<UsersComboboxProps> = (props) => {
  const [partecipanti, _] = usePartecipanti();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);

  const { className, removePartecipante, addPartecipante, ...others } = props;

  // Create a new timeout every time the user types something to avoid making unecessary
  // api calls that are overwritten shortly after.
  // Make the api call only if some time as passed since the last input by the user
  const handleSearch = async (value: string) => {
    setLoading(true);
    // If the user types something before the timer has finished, prevent this
    // timer from making an api call
    if (timer) clearTimeout(timer);

    // Start a new timer
    const newTimer = setTimeout(async () => {
      value ? setUsers(await getUsers(value)) : setUsers([]);
      setLoading(false);
    }, 300);

    setTimer(newTimer);
  };



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
            <div className="flex flex-row justify-between items-center">
              <CommandInput placeholder="Cerca utenti..." onValueChange={handleSearch} />
              {loading && <Spinner content="Ricerca..." />}
            </div>
            <CommandList>
              {
                users.length != 0
                  ? users.map(user => (
                    <UserItem user={user} onSelect={async email => {
                      // There will always be a user since I'm able to select the email item
                      const user = users.find(user => user.email === email.trim())!;
                      isUserPartecipante(user, partecipanti) ? removePartecipante!(user) : addPartecipante!(user);
                    }} />
                  ))
                  : partecipanti.length != 0
                    ? partecipanti.map(partecipante => (
                      <UserItem user={partecipante} onSelect={async email => removePartecipante!(partecipante)} />
                    ))
                    : <>Nessun utente o partecipante trovato</>
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