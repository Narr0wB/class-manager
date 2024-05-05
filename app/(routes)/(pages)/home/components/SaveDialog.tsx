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

type SaveDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const SaveDialog: React.FC<SaveDialogProps> = ({ open }) => {
  const [isOpen, setIsOpen] = open;
  const { toast } = useToast();

  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancella</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            toast({
              title: "Aggiunta prenotazione",
              description: "eddu",
            })
          }}
          >
            Salva
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

SaveDialog.displayName = "SaveDialog";

export default SaveDialog;