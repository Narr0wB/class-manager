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
import { formatHour } from "@/lib/utils";
import React, { useCallback } from "react";

type ConfirmUpdateDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  setRenderMapFlag: React.Dispatch<React.SetStateAction<boolean>>,
  prenotazioneId: number;
  ora_inizio: number;
  ora_fine: number;
}

const ConfirmUpdateDialog: React.FC<ConfirmUpdateDialogProps> = ({ open, setRenderMapFlag, prenotazioneId, ora_inizio, ora_fine }) => {
  const [isOpen, setIsOpen] = open;
  const { toast } = useToast();

  const updatePrenotazione = useCallback(async (ora_inizio: number, ora_fine: number) => {
    await fetch(`/api/database/prenotazione/UPDATE`, {
      method: "POST",
      body: JSON.stringify({
        ora_inizio: ora_inizio,
        ora_fine: ora_fine,
        id: prenotazioneId
      })
    });
  }, [ora_inizio, ora_fine, prenotazioneId]);

  // Do not change whitespaces
  const prenotazioneInfo = <>
    dalle
    <span className="text-primary"> {`${formatHour(ora_inizio)}`} </span>
    alle
    <span className="text-primary"> {`${formatHour(ora_fine)}`} </span>
  </>

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            Dati che cambieranno:
            {prenotazioneInfo}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancella</AlertDialogCancel>
          <AlertDialogAction onClick={async () => {
            await updatePrenotazione(ora_inizio, ora_fine);

            toast({
              title: "Prenotazione modificata",
              description: prenotazioneInfo,
            });

            // Workaround to trigger a re-render in the Map component
            setRenderMapFlag(prev => !prev);
          }}>
            Conferma
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

ConfirmUpdateDialog.displayName = "ConfirmUpdateDialog";

export default ConfirmUpdateDialog;