import { useSheet } from "@/app/components/LayoutProvider";
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
  import React, { SetStateAction, useCallback } from "react";
  
  type ConfirmUpdateDialogProps = {
    prenotazioneId: number;
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
  }
  
  const ConfirmUpdateDialog: React.FC<ConfirmUpdateDialogProps> = ({ prenotazioneId, open, setOpen }) => {
    const [_, setSheet] = useSheet();
  
    const deletePrenotazione = useCallback(async () => {
        const res = await fetch(
            "/api/database/prenotazione/DELETE", {
            method: "POST",
            body: JSON.stringify({
                id: prenotazioneId,
            })
        });
    }, [prenotazioneId]);
  
    return (
        <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminare?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione è irreversibile. Sicuri di volere procedere?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {setOpen(prev => !prev)}}>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
            await deletePrenotazione();
            setSheet(false);
            setOpen(prev => !prev);
          }}>Continua</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  ConfirmUpdateDialog.displayName = "ConfirmUpdateDialog";
  
  export default ConfirmUpdateDialog;