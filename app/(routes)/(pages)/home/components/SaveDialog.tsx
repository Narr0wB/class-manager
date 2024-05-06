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
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { useTimeframe } from "./HomeProvider";
import { Prenotazione, Utente } from "@/lib/backend/database";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

type SaveDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  aula: number
}

const SaveDialog: React.FC<SaveDialogProps> = ({ open, aula }) => {
  const [isOpen, setIsOpen] = open;
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useTimeframe();
  const session = useSession();
  // const [prenotazioni, setPrenotazioni] = useState<Prenotazione[] | null>(null);

  // const fetchData = useCallback(async () => {
  //   const res = await fetch(
  //     `/api/database/prenotazione/SELECT?date=${timeframe.data}&userEmail=${session.data?.user?.email}`,
  //     { method: "GET" }
  //   );
  //   const prenotazioni = await res.json();
  //   return prenotazioni;
  // }, [timeframe.data, session.data?.user?.email]);

  // useEffect(() => {
  //   fetchData().then(prenotazioni => setPrenotazioni(prenotazioni));
  // }, [timeframe.data]);

  const fetchUser = useCallback(async () => {
    const res = await fetch(
      `/api/database/utente/SELECT?userEmail=${session.data?.user?.email}`,
      { method: "GET" }
    );
    const user = await res.json();
    return user as Utente;
  }, [session.data?.user?.email]);

  const insertPrenotazione = async (prenotazione: Prenotazione) => {
    const res = await fetch(
      "/api/database/prenotazione/INSERT",
      { method: "POST", body: JSON.stringify(prenotazione) }
    );
    const data = await res.json();
    return data;
  }

  const date = timeframe.data.toLocaleDateString("it", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  function formatHour(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}:${m}`;
  }

  const prenotazioneInfo = <>
    il giorno
    <span className="text-primary"> {`${date}`} </span>
    dalle
    <span className="text-primary"> {`${formatHour(timeframe.inizio)}`} </span>
    alle
    <span className="text-primary"> {`${formatHour(timeframe.fine)}`} </span>
  </>

  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          {/* Do not change whitespaces */}
          <AlertDialogDescription>
            Prenotazione per {prenotazioneInfo}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancella</AlertDialogCancel>
          <AlertDialogAction onClick={async () => {
            const user = await fetchUser();
            const data = await insertPrenotazione({
              id_utente: user.id,
              id_aula: aula,
              data: timeframe.data,
              approvata: false
            }) as any;
            const prenotazioneId = data.id;
            console.log(prenotazioneId);
            toast({
              title: "Aggiunta prenotazione",
              description: prenotazioneInfo,
            });
          }}>
            Salva
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

SaveDialog.displayName = "SaveDialog";

export default SaveDialog;