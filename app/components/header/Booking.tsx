import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PRENOTAZIONE_APPROVED, PRENOTAZIONE_REJECTED } from "@/lib/backend/admin";
import { Prenotazione, Utente } from "@/lib/backend/database";
import { formatDate, minutesToString, stringToMinutes } from "@/lib/utils";
import { CalendarIcon, Clock3Icon, DoorOpenIcon, TrashIcon } from "lucide-react";
import Pulse from "./Pulse";
import ConfirmDeletionDialog from "@/app/(routes)/(pages)/home/components/ConfirmDeletionDialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/custom/CustomTooltip";

type BookingProps = {
  prenotazione: Prenotazione;
  partecipanti?: Utente[];
  n: number;
} & React.HTMLAttributes<HTMLDivElement>

// async function fetchPartecipanti(prenotazioneId: number) {
//   const res = await fetch(
//     `/api/database/partecipazione/SELECT?prenotazioneId=${prenotazioneId}`,
//     { method: "GET" }
//   );

//   const partecipanti = await res.json() as Utente[];

//   return partecipanti;
// }

type Status = "In approvazione" | "Approvata" | "Rifiutata";
type Color = "bg-yellow-500" | "bg-green-500" | "bg-red-500";

const Booking: React.FC<BookingProps> = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [partecipanti, setPartecipanti] = useState<Utente[]>([]);

  const { prenotazione, n, ...others } = props;

  // useEffect(() => {
  //   fetchPartecipanti(prenotazione.id!).then(partecipanti => setPartecipanti(partecipanti));
  // }, []);

  let statusString: Status = "In approvazione";
  let colorString: Color = "bg-yellow-500";

  switch (prenotazione.status) {
    case PRENOTAZIONE_APPROVED: {
      statusString = "Approvata";
      colorString = "bg-green-500"
      break;
    }
    case PRENOTAZIONE_REJECTED: {
      statusString = "Rifiutata";
      colorString = "bg-red-500";
      break;
    }
  }

  return (
    <>
      <Card className="w-full overflow-y-auto relative">
        <CustomTooltip content="Elimina">
          <Button
            variant={"ghost"}
            onClick={() => setDialogOpen(prev => !prev)}
            className="absolute p-1 right-1 top-1 size-6"
          >
            <TrashIcon className="size-full" />
            <span className="sr-only">Elimina</span>
          </Button>
        </CustomTooltip>
        <CardHeader className="text-center p-4 space-y-0">
          <div className="relative">
            <Pulse color={colorString} className="absolute top-0 bottom-0 m-auto" />
            <CardTitle className="w-full text-sm md:text-lg text-center md:lg:xl:2xl">
              Prenotazione {n + 1}
            </CardTitle>
          </div>
          <CardDescription>
            {statusString}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-col justify-center items-center gap-2 p-4">
          <div className="space-y-3">
            <span className="flex flex-row gap-1">
              <CalendarIcon />
              {/* Here a new Date object must be created */}
              {formatDate(new Date(prenotazione.data))}
            </span>
            <span className="flex flex-row gap-1">
              <Clock3Icon />
              {/* TODO reformat this mess */}
              {minutesToString(stringToMinutes(`${prenotazione.ora_inizio}`))}
              -
              {minutesToString(stringToMinutes(`${prenotazione.ora_fine}`))}
            </span>
            <span className="flex flex-row gap-1">
              <DoorOpenIcon />
              Aula {prenotazione.id_aula}
            </span>
            {/* {
              partecipanti.length != 0 &&
              <div>
                <h1>Partecipanti</h1>
                <ul>
                  {
                    partecipanti.map((partecipante, i) => (
                      <ul key={i} className="text-xs">
                        {partecipante.nome + " " + partecipante.classe}
                      </ul>
                    ))
                  }
                </ul>
              </div>
            } */}
          </div>
        </CardContent>
      </Card>
      <ConfirmDeletionDialog prenotazioneId={props.prenotazione.id!} open={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  )
}

Booking.displayName = "Booking";

export default Booking;