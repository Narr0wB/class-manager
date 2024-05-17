import { useToast } from "@/components/ui/use-toast";
import { User, usePartecipanti } from "../HomeProvider";
import React from "react";

type UsersContainerProps = {
} & React.HTMLAttributes<HTMLDivElement>

export type UsersUtility = {
  addPartecipante?: (partecipante: User) => void;
  removePartecipante?: (partecipante: User) => void;
}

const UsersContainer: React.FC<UsersContainerProps> = (props) => {
  const { toast } = useToast();
  const [partecipanti, setPartecipanti] = usePartecipanti();

  const { children, ...others } = props;

  function addPartecipante(partecipante: User) {
    setPartecipanti(prev => [...prev, partecipante]);
    toast({
      title: "Successo!",
      description: (
        // Don't change whitespaces
        <>
          Il partecipante
          <span className="font-semibold"> {partecipante.email} </span>
          è stato
          <span className="text-green-500"> aggiunto </span>
          alla prenotazione.
        </>
      )
    });
  }

  function removePartecipante(partecipante: User) {
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
  }


  return (
    <div id="users-container" className="space-y-3" {...others}>
      {
        React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
              addPartecipante: addPartecipante,
              removePartecipante: removePartecipante
            } as UsersUtility)
            : child
        )
      }
    </div>
  )
}

UsersContainer.displayName = "UsersContainer";

export default UsersContainer;