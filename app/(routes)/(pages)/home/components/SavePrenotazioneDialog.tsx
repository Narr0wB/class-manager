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

            rerenderMap();
          }}>
            Salva
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

SavePrenotazioneDialog.displayName = "SavePrenotazioneDialog";

export default SavePrenotazioneDialog;