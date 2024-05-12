import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { PRENOTAZIONE_APPROVED, PRENOTAZIONE_REJECTED } from "@/lib/backend/admin";
import { Prenotazione } from "@/lib/backend/database";
import { formatDate, formatHour, stringToMinutes } from "@/lib/utils";
import { CalendarIcon, Clock3Icon, DoorOpenIcon, TrashIcon } from "lucide-react";
import Pulse from "./Pulse";
import ConfirmDeletionDialog from "@/app/(routes)/(pages)/home/components/ConfirmDeletionDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/custom/CustomTooltip";

type BookingProps = {
  prenotazione: Prenotazione;
  n: number;
} & React.HTMLAttributes<HTMLDivElement>

type Status = "In approvazione" | "Approvata" | "Rifiutata";
type Color = "bg-yellow-500" | "bg-green-500" | "bg-red-500";

const Booking: React.FC<BookingProps> = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { prenotazione, n, ...others } = props;

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
        <CardHeader className="text-center p-4">
          <div className="flex flex-row items-center gap-1">
            <Pulse color={colorString} />
            <CardTitle className="text-sm md:text-lg text-center flex-1 md:lg:xl:2xl">
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
              {formatHour(stringToMinutes(`${prenotazione.ora_inizio}`))}
              -
              {formatHour(stringToMinutes(`${prenotazione.ora_fine}`))}
            </span>
            <span className="flex flex-row gap-1">
              <DoorOpenIcon />
              Aula {prenotazione.id_aula}
            </span>
          </div>
        </CardContent>
      </Card>
      <ConfirmDeletionDialog prenotazioneId={props.prenotazione.id!} open={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  )
}

Booking.displayName = "Booking";

export default Booking;