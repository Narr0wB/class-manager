"use client"

import { useCallback, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Button } from "../../../../../../components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandItem, CommandList } from "../../../../../../components/ui/command";
import { cn } from "@/lib/utils";
import { User, usePartecipanti } from "../HomeProvider";
import { UsersUtility } from "./UsersContainer";
import Spinner from "./Spinner";
import { CommandEmpty } from "cmdk";
import { useSession } from "next-auth/react";

type UsersComboboxProps = {
} & Partial<UsersUtility> & React.HTMLAttributes<HTMLDivElement>

// Don't use the "includes" method because it doesn't necessarily work with objects
const isUserPartecipante = (user: User, partecipanti: User[]) => partecipanti.some(partecipante => partecipante.id === user.id);

type CommandItemProps = React.ComponentProps<typeof CommandItem>;
type UserItemProps = {
  user: User,
} & CommandItemProps
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
  const [inputEmpty, setInputEmpty] = useState(true);
  const session = useSession();

  const { className, removePartecipante, addPartecipante, ...others } = props;

  const getUsers = useCallback(async (email: string) => {
    const res = await fetch(
      `/api/database/utente/SELECT_EMAIL?email=${email}`, {
      method: "GET",
    });
    const users = await res.json() as User[];
    const withoutCurrent = users.filter(user => user.email != session.data?.user?.email);
    return withoutCurrent;
  }, [session.data?.user?.email]);

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

  const listUsers = () => (
    users.map((user, i) => (
      <UserItem key={i} user={user} onSelect={async email => {
        // There will always be a user since I'm able to select the email item
        const user = users.find(user => user.email === email.trim())!;
        isUserPartecipante(user, partecipanti) ? removePartecipante!(user) : addPartecipante!(user);
      }} />
    ))
  )

  const listPartecipanti = () => (
    partecipanti.map((partecipante, i) => (
      <UserItem key={i} user={partecipante} onSelect={async () => removePartecipante!(partecipante)} />
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
    <div id="users-combobox" className={cn("", className)} {...others}>
      <Popover open={open} onOpenChange={open => {
        setOpen(open);
        // Reset the list of searched users so that the next
        // time the popup will be open, there will be no user
        // displayed. (Especially if the popup is closed by clicking out of it)
        if (!open) {
          setUsers([]);
          setInputEmpty(true);
        }
      }}>
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
            <CommandInput placeholder="Cerca utenti..." onValueChange={handleSearch} />
            <CommandEmpty>
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
    </div >
  )
}

UsersCombobox.displayName = "UsersCombobox";

export default UsersCombobox;