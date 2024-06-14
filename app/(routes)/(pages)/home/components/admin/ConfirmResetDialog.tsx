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
import React from "react";

type ConfirmResetDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  action: () => void
}

const ConfirmResetDialog: React.FC<ConfirmResetDialogProps> = ({ open, action }) => {
  const [isOpen, setIsOpen] = open;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            Confermando eliminerai tutti i giorni disabilitati
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancella</AlertDialogCancel>
          <AlertDialogAction onClick={action}>
            Conferma
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

ConfirmResetDialog.displayName = "ConfirmResetDialog";

export default ConfirmResetDialog;
