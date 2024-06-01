"use client"

import { useCallback, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Button } from "../../../../../../components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from "../../../../../../components/ui/command";
import { cn } from "@/lib/utils";
import { usePartecipanti } from "../HomeProvider";
import { UsersUtility, getUserInfo } from "./UsersContainer";
import Spinner from "./Spinner";
import { useSession } from "next-auth/react";
import { Utente } from "@/lib/backend/database";

type UsersComboboxProps = {
} & Partial<UsersUtility> & React.HTMLAttributes<HTMLDivElement>

// Don't use the "includes" method because it doesn't necessarily work with objects
const isUserPartecipante = (user: Utente, partecipanti: Utente[]) => partecipanti.some(partecipante => partecipante.id === user.id);
const parseInfo = (info: string) => info.trim().split(", ");

type CommandItemProps = React.ComponentProps<typeof CommandItem>;
type UserItemProps = {
  user: Utente,
} & Omit<CommandItemProps, "value">
const UserItem: React.FC<UserItemProps> = (props) => {
  const { user, ...others } = props;
  const [partecipanti, _] = usePartecipanti();

  return (
    <CommandItem
      value={getUserInfo(user)}
      {...others}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          isUserPartecipante(user, partecipanti) ? "opacity-100" : "opacity-0"
        )}
      />
      {getUserInfo(user)}
    </CommandItem>
  )
}

const UsersCombobox: React.FC<UsersComboboxProps> = (props) => {
  const [partecipanti, _] = usePartecipanti();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Utente[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputEmpty, setInputEmpty] = useState(true);

  const { className, removePartecipante, addPartecipante, ...others } = props;

  const getUsers = async (name: string) => {
    const res = await fetch(
      `/api/database/utente/SELECT_NAME?name=${name}`, {
      method: "GET",
    });
    const users = await res.json() as Utente[];

    return users;
  }

  // Create a new timeout every time the user types something to avoid making unecessary
  // api calls that are overwritten shortly after.
  // Make the api call only if some time as passed since the last input by the user
  const handleSearch = async (value: string) => {
    setLoading(true);
    setInputEmpty(value === "");
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

  const reset = () => {
    // Reset the list of searched users so that the next
    // time the popup will be open, there will be no user
    // displayed. (Especially if the popup is closed by clicking out of it)
    if (!open) {
      setUsers([]);
      setInputEmpty(true);
    }
  }

  const listUsers = () => {
    return users.map(user => (
      <UserItem key={user.id} user={user} onSelect={async info => {
        // There will always be a user since I'm able to select the item
        const [nome, _] = parseInfo(info);
        const user = users.find(user => user.nome === nome)!;
        isUserPartecipante(user, partecipanti) ? removePartecipante!(user) : addPartecipante!(user);

        // Close the combobox
        setOpen(false);
        reset();
      }} />
    ))
  }

  const listPartecipanti = () => (
    partecipanti.map(partecipante => (
      <UserItem key={partecipante.id} user={partecipante} onSelect={async () => removePartecipante!(partecipante)} />
    ))
  )

  const commandListContent = () => {
    if (loading) return (
      <div className="p-2">
        <Spinner content="Ricerca..." className="p-1 fill-primary" />
      </div>
    )

    if (users.length != 0) return listUsers();

    if (partecipanti.length != 0 && inputEmpty) return (
      <>
        <p className="p-2">Partecipanti aggiunti</p>
        {listPartecipanti()}
      </>
    );
  }

  return (
    <div id="users-combobox" className={cn(partecipanti.length != 0 ? "flex flex-row-reverse justify-between items-center" : "", className)} {...others}>
      {
        partecipanti.length != 0 &&
        <div className="rounded-secondary border-primary border-[3px] select-none rounded-full h-3/4 aspect-square flex items-center justify-center">
          {partecipanti.length}
        </div>
      }
      <div>
        <Popover open={open} onOpenChange={open => {
          setOpen(open);
          reset();
        }}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-fit justify-between md:text-2xl lg:text-xl"
            >
              Aggiungi partecipanti
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <Command shouldFilter={false}>
              <CommandInput placeholder="Cerca utenti..." onValueChange={handleSearch} />
              <CommandEmpty className="p-0">
                {
                  !loading &&
                  <p className="p-2">
                    {inputEmpty ? "Nessun partecipante aggiunto." : "Nessun utente trovato"}
                  </p>
                }
              </CommandEmpty>
              <CommandList>
                {commandListContent()}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div >
  )
}

UsersCombobox.displayName = "UsersCombobox";

export default UsersCombobox;