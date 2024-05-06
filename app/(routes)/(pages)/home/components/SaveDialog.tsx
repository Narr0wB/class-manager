import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { useTimeframe } from "./HomeProvider";
import { Prenotazione, TimeFrame, Utente } from "@/lib/backend/database";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { formatDate, formatHour } from "@/lib/utils";
import React from "react";

type SaveDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  aula: number,
  setRenderMapFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const SaveDialog: React.FC<SaveDialogProps> = ({ open, aula, setRenderMapFlag }) => {
  const [isOpen, setIsOpen] = open;
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useTimeframe();
  const session = useSession();

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

  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            Prenotazione per {prenotazioneInfo}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancella</AlertDialogCancel>
          <AlertDialogAction onClick={async () => {
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
            const data = await res.json();

            // IDK if its useful
            const prenotazioneId = data.id;
            toast({
              title: "Aggiunta prenotazione",
              description: prenotazioneInfo,
            });

            // Workaround to trigger a re-render in the Map component
            setRenderMapFlag(prev => !prev);
          }}>
            Salva
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

SaveDialog.displayName = "SaveDialog";

export default SaveDialog;