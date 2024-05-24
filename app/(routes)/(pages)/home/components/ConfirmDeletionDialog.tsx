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
import React, { SetStateAction, useCallback } from "react";

type ConfirmDeletionDialogProps = {
  prenotazioneId: number;
  open: boolean;
  setDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ConfirmDeletionDialog: React.FC<ConfirmDeletionDialogProps> = ({ prenotazioneId, open, setDialogOpen }) => {
  const [_, setSheetOpen] = useSheet();
  const rerenderMap = useRerender();
  const { toast } = useToast();

  const deletePrenotazione = useCallback(async () => {
    const res = await fetch(
      "/api/database/prenotazione/DELETE", {
      method: "POST",
      body: JSON.stringify({
        id: prenotazioneId,
      })
    });
    return res.ok;
  }, [prenotazioneId]);

  const handleDelete = async () => {
    const ok = await deletePrenotazione();
    if (ok) {
      setSheetOpen(false);
      setDialogOpen(false);
      rerenderMap();
      toast({
        title: "Prenotazione eliminata!"
      });
    } else {
      toast({
        title: "Errore...",
        description: "Errore nell'eliminare la prenotazione.",
        action: <Button variant={"ghost"} onClick={handleDelete}>Riprova</Button>,
        variant: "destructive"
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminare?</AlertDialogTitle>
          <AlertDialogDescription>
            Questa azione è irreversibile. Procedere?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continua
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

ConfirmDeletionDialog.displayName = "ConfirmDeletionDialog";

export default ConfirmDeletionDialog;
