import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

type InfoPrenotazioneDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  startHour: string,
  endHour: string
}

const InfoPrenotazioneDialog: React.FC<InfoPrenotazioneDialogProps> = ({ open, startHour, endHour }) => {
  const [isOpen, setIsOpen] = open;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Informazioni</AlertDialogTitle>
          <AlertDialogDescription>
            {
              `Quest'aula è prenotata dalle ore 
              ${startHour}
              alle ore 
              ${endHour}
              `
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Chiudi</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

InfoPrenotazioneDialog.displayName = "InfoPrenotazioneDialog";

export default InfoPrenotazioneDialog;
