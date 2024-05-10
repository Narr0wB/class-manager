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
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import React, { useState } from "react";
import ConfirmUpdateDialog from "./ConfirmUpdateDialog";

type UpdatePrenotazioneDialogProps = {
  children: React.ReactNode;
  prenotazioneId: number;
}

const UpdatePrenotazioneDialog: React.FC<UpdatePrenotazioneDialogProps> = ({ children, prenotazioneId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aggiorna</AlertDialogTitle>
            <AlertDialogDescription>
              Aggiorna la prenotazione
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancella</AlertDialogCancel>
            <AlertDialogAction onClick={() => setConfirmOpen(true)}>
              Aggiorna
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ConfirmUpdateDialog open={[confirmOpen, setConfirmOpen]} setRenderMapFlag={ } prenotazioneId={0} ora_inizio={0} ora_fine={0} />
    </>
  )
}

UpdatePrenotazioneDialog.displayName = "UpdatePrenotazioneDialog";

export default UpdatePrenotazioneDialog;