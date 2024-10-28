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
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { usePartecipanti, useTimeframe } from "./HomeProvider";
import { formatDate, minutesToString } from "@/lib/utils";
import React from "react";
import { useRerender } from "@/app/components/LayoutProvider";
import { Button } from "@/components/ui/button";
import { InsertResponse } from "@/app/(routes)/api/database/prenotazione/INSERT/route";

type SavePrenotazioneDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  aula: number,
}

const SavePrenotazioneDialog: React.FC<SavePrenotazioneDialogProps> = ({ open, aula }) => {
  const [isOpen, setIsOpen] = open;
  const { toast } = useToast();
  const [timeframe, _] = useTimeframe();
  const [partecipanti, setPartecipanti] = usePartecipanti();
  const session = useSession();
  const rerenderMap = useRerender();

  const date = formatDate(timeframe.data);

  // Do not change whitespaces
  const prenotazioneInfo = `
    prenotazione per il giorno 
    ${date} 
    dalle 
    ${minutesToString(timeframe.inizio)} 
    alle 
    ${minutesToString(timeframe.fine)} 
    nell'aula 
    ${aula}
  `;

  const handleInsert = async () => {
    // Get only the id of every partecipante
    const partecipazioni = partecipanti.map(partecipante => partecipante.id);
    setPartecipanti([]);

    // Insert the array of prenotazioni
    const res = await fetch(
      "/api/database/prenotazione/INSERT", {
      method: "POST",
      body: JSON.stringify({
        user_email: session.data?.user?.email,
        id_aula: aula,
        timeframe: timeframe,
        partecipazioni: partecipazioni
      })
    });

    const body = await res.json() as InsertResponse;

    if (body.ok) {
      rerenderMap();
      toast({
        title: "Aggiunta prenotazione",
        description: prenotazioneInfo,
      });
    } else {
      toast({
        title: "Errore...",
        description: body.error,
        action: <Button variant={"ghost"} onClick={handleInsert}>Riprova</Button>,
        variant: "destructive"
      });
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            Confermando aggiungerai una {prenotazioneInfo}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancella</AlertDialogCancel>
          <AlertDialogAction onClick={handleInsert}>
            Conferma
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

SavePrenotazioneDialog.displayName = "SavePrenotazioneDialog";

export default SavePrenotazioneDialog;
