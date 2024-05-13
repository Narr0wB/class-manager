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
import { useTimeframe } from "./HomeProvider";
import { formatDate, formatHour } from "@/lib/utils";
import React from "react";
import { useRerender } from "@/app/components/LayoutProvider";
import { Button } from "@/components/ui/button";

type SavePrenotazioneDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  aula: number,
}

const SavePrenotazioneDialog: React.FC<SavePrenotazioneDialogProps> = ({ open, aula }) => {
  const [isOpen, setIsOpen] = open;
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useTimeframe();
  const session = useSession();
  const rerenderMap = useRerender();

  const date = formatDate(timeframe.data);

  // Do not change whitespaces
  const prenotazioneInfo = <>
    il giorno
    <span className="text-primary"> {`${date}`} </span>
    dalle
    <span className="text-primary"> {`${formatHour(timeframe.inizio)}`} </span>
    alle
    <span className="text-primary"> {`${formatHour(timeframe.fine)}`} </span>
  </>

const handleInsert = async () => {
  // Insert the prenotazione
  const res = await fetch(
    "/api/database/prenotazione/INSERT", {
    method: "POST",
    body: JSON.stringify({
      user_email: session.data?.user?.email,
      id_aula: aula,
      timeframe: timeframe
    })
  });

  console.log(res.ok);
  
  if (res.ok) {
    rerenderMap();
    toast({
      title: "Aggiunta prenotazione",
      description: prenotazioneInfo,
    });
  } else {
    toast({
      title: "Errore...",
      description: "Errore nell'inserire la prenotazione.",
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
            Prenotazione per {prenotazioneInfo}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancella</AlertDialogCancel>
          <AlertDialogAction onClick={handleInsert}>
            Salva
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

SavePrenotazioneDialog.displayName = "SavePrenotazioneDialog";

export default SavePrenotazioneDialog;