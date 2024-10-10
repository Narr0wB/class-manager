import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MailIcon } from "lucide-react";
import React from "react";

type ContactsDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ContactsDialog: React.FC<ContactsDialogProps> = ({ open }) => {
  const [isOpen, setIsOpen] = open;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Contattaci
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="space-y-5 text-secondary-foreground">
          <ul>
            <li className="flex flex-row space-x-1">
              <MailIcon className="size-8" />
              <span className="flex items-center">infostudenti@liceocuneo.it</span>
            </li>
          </ul>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Chiudi</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

ContactsDialog.displayName = "ContactsDialog";

export default ContactsDialog;
