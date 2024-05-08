import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { PRENOTAZIONE_APPROVED, PRENOTAZIONE_REJECTED } from "@/lib/backend/admin";
import { Prenotazione } from "@/lib/backend/database";
import { formatDate, formatHour, stringToMinutes } from "@/lib/utils";
import { CalendarIcon, Clock3Icon, DoorClosedIcon, DoorOpenIcon, Edit3Icon, School2Icon, SchoolIcon, Table2Icon, TableIcon, TrashIcon } from "lucide-react";
import Pulse from "./Pulse";

type BookingProps = {
  prenotazione: Prenotazione;
  n: number;
} & React.HTMLAttributes<HTMLDivElement>

type Status = "In approvazione" | "Approvata" | "Rifiutata";
type Color = "bg-gray-500" | "bg-green-500" | "bg-red-500";

const Booking: React.FC<BookingProps> = (props) => {
  const { prenotazione, n, ...others } = props;

  let statusString: Status = "In approvazione";
  let colorString: Color = "bg-gray-500";

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
    <ContextMenu>
      <ContextMenuTrigger>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex flex-row items-center gap-1">
              <Pulse color={colorString} />
              Prenotazione {n + 1}
            </CardTitle>
            <CardDescription className="text-center">
              {statusString}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center gap-2 relative">
            {/* Here a new Date object must be created */}
            <div className="space-y-3">
              <span className="flex flex-row gap-1">
                <CalendarIcon />
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
                {prenotazione.id_aula}
              </span>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="flex flex-row gap-2">
          <Edit3Icon className="w-fit aspect-square" />
          Modifica
        </ContextMenuItem>
        <ContextMenuItem className="flex flex-row gap-2">
          <TrashIcon className="w-fit aspect-square" />
          Elimina
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

Booking.displayName = "Booking";

export default Booking;