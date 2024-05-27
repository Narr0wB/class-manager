import { useToast } from "@/components/ui/use-toast";
import { usePartecipanti } from "../HomeProvider";
import React from "react";

import config from "@/public/config.json";
import { Utente } from "@/lib/backend/database";

type UsersContainerProps = {
} & React.ComponentProps<typeof React.Fragment>

export type UsersUtility = {
  addPartecipante: (partecipante: Utente) => void;
  removePartecipante: (partecipante: Utente) => void;
}

export const getUserInfo = (user: Utente) => `${user.nome}, ${user.classe}`;

const UsersContainer: React.FC<UsersContainerProps> = ({ children }) => {
  const { toast } = useToast();
  const [partecipanti, setPartecipanti] = usePartecipanti();

  function addPartecipante(partecipante: Utente) {
    const max_partecipanti = config.max.num_partecipanti;
    if (partecipanti.length == max_partecipanti) {
      toast({
        title: "Errore!",
        description: `Numero massimo di partecipanti raggiunti (${max_partecipanti})`,
        variant: "destructive"
      });
      return;
    }

    setPartecipanti(prev => [...prev, partecipante]);
    toast({
      title: "Successo!",
      description: (
        // Don't change whitespaces
        <>
          Il partecipante
          <span className="font-semibold"> {partecipante.nome} </span>
          appartenente alla classe
          <span className="font-semibold"> {partecipante.classe} </span>
          è stato
          <span className="text-green-500"> aggiunto </span>
          alla prenotazione.
        </>
      )
    });
  }

  function removePartecipante(partecipante: Utente) {
    const updatedPartecipanti = partecipanti.filter(p => p.id !== partecipante.id);
    setPartecipanti(updatedPartecipanti);
    toast({
      title: "Successo!",
      description: (
        // Don't change whitespaces
        <>
          Il partecipante
          <span className="font-semibold"> {partecipante.nome} </span>
          appartenente alla classe
          <span className="font-semibold"> {partecipante.classe} </span>
          è stato
          <span className="text-red-500"> rimosso </span>
          dalla prenotazione.
        </>
      )
    });
  }


  return (
    React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
          addPartecipante: addPartecipante,
          removePartecipante: removePartecipante
        } as UsersUtility)
        : child
    )
  )
}

UsersContainer.displayName = "UsersContainer";

export default UsersContainer;