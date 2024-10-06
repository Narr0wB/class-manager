import { useRerender, useSheet } from "@/app/components/LayoutProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Utente } from "@/lib/backend/database";
import React, { SetStateAction, useEffect, useState } from "react";
import UsersList from "./input-section/UsersList";
import UsersCombobox from "./input-section/UsersCombobox";
import config from "@/public/config.json";

type EditPrenotazioneDialogProps = {
  prenotazioneId: number;
  partecipanti: Utente[] | null;
  open: boolean;
  setDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

const EditPrenotazioneDialog: React.FC<EditPrenotazioneDialogProps> = ({ prenotazioneId, partecipanti, open, setDialogOpen }) => {
  const [_, setSheetOpen] = useSheet();
  const rerenderMap = useRerender();
  const { toast } = useToast();
  const [eddu, setEddu] = useState(false);

  useEffect(() => {
    setEddu(false);
    console.log(partecipanti);
  }, []);

  // Do this because we don't want to update the original "partecipanti",
  // instead work with this new state and update the database with a single call
  const [newPartecipanti, setNewPartecipanti] = useState<Utente[] | null>(partecipanti);

  const editPrenotazione = async () => {
    const res = await fetch(
      "/api/database/prenotazione/UPDATE", {
      method: "POST",
      body: JSON.stringify({
        id: prenotazioneId,
        partecipanti: newPartecipanti
      })
    });
    return res.ok;
  };

  const handleEdit = async () => {
    const ok = await editPrenotazione();
    if (ok) {
      setSheetOpen(false);
      setDialogOpen(false);
      rerenderMap();
      toast({
        title: "Partecipanti aggiornati!"
      });
    } else {
      toast({
        title: "Errore...",
        description: "Errore nell'aggiornare i partecipanti della prenotazione.",
        action: <Button variant={"ghost"} onClick={handleEdit}>Riprova</Button>,
        variant: "destructive"
      });
    }
  }

  // TODO: Refactor duplicated code in "UsersContainer.tsx"
  function addPartecipante(partecipante: Utente) {
    const max_partecipanti = config.max.num_partecipanti;
    if (newPartecipanti?.length == max_partecipanti) {
      toast({
        title: "Errore!",
        description: `Numero massimo di partecipanti raggiunti (${max_partecipanti})`,
        variant: "destructive"
      });
      return;
    }

    setNewPartecipanti(prev => [...prev!, partecipante]);
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
    const updatedPartecipanti = newPartecipanti?.filter(p => p.id !== partecipante.id);
    setNewPartecipanti(updatedPartecipanti || null);
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
    <AlertDialog open={open} onOpenChange={setDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Modifica</AlertDialogTitle>
          <AlertDialogDescription>
            Aggiungi o rimuovi dei partecipanti
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grow shrink-0 basis-1.5 min-h-40 flex flex-col gap-2 p-2">
          <UsersCombobox className="flex-none" partecipanti={newPartecipanti!} addPartecipante={addPartecipante} removePartecipante={removePartecipante} />
          <UsersList className="flex-1 overflow-auto content-start rounded-secondary" partecipanti={newPartecipanti!} addPartecipante={addPartecipante} removePartecipante={removePartecipante} />
        </div>
        <AlertDialogFooter>
          {/* Reset the partecipanti count when closing the dialog without saving */}
          <AlertDialogCancel onClick={() => setNewPartecipanti(partecipanti)}>Annulla</AlertDialogCancel>
          <AlertDialogAction onClick={handleEdit}>
            Salva
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

EditPrenotazioneDialog.displayName = "EditPrenotazioneDialog";

export default EditPrenotazioneDialog;
