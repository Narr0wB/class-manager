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
import { Input } from "@/components/ui/input";

type UpdatePrenotazioneDialogProps = {
  children: React.ReactNode;
  prenotazioneId: number;
}

const UpdatePrenotazioneDialog: React.FC<UpdatePrenotazioneDialogProps> = ({ children, prenotazioneId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [end, setEnd] = useState(0);
  const [start, setStart] = useState(0);

  const handleChange = (e: any) => {
    const [hours, mins] = e.target.value;
  }

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
              Aggiorna l'orario della prenotazione
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            type="time"
            step={600}
            className="h-max justify-center text-center text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl"
          />
          <Input
            type="time"
            step={600}
            onChange={handleChange}
            className="h-max justify-center text-center text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancella</AlertDialogCancel>
            <AlertDialogAction onClick={() => setConfirmOpen(true)}>
              Aggiorna
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ConfirmUpdateDialog open={[confirmOpen, setConfirmOpen]} setRenderMapFlag={setConfirmOpen} prenotazioneId={prenotazioneId} ora_inizio={0} ora_fine={0} />
    </>
  )
}

UpdatePrenotazioneDialog.displayName = "UpdatePrenotazioneDialog";

export default UpdatePrenotazioneDialog;