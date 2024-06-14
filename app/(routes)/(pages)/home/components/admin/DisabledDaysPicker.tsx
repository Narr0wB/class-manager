import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { isBefore, isSameDay } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { DateRange, DayMouseEventHandler } from "react-day-picker";
import ConfirmResetDialog from "./ConfirmResetDialog";

type Props = {};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.substring(1);
}

function getDatesInRange(Range: DateRange) {
  const dateArray = [];
  const { from, to } = Range;
  if (!from || !to) return [];

  let currentDate = new Date(from);
  while (isBefore(currentDate, to)) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  dateArray.push(to);
  return dateArray;
}

export const DisabledDaysPicker = ({ }: Props) => {
  const modes = ["Normale", "Range"];
  const [mode, setMode] = useState<"Normale" | "Range">("Normale");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [rangeFrom, setRangeFrom] = useState<Date | undefined>();
  const [initialDisabledCount, setInitialDisabledCount] = useState(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { toast } = useToast();

  async function readDatesFromFile() {
    const res = await fetch("/api/disabled/read", { method: "GET" });
    if (!res.ok) {
      toast({
        title: "Errore",
        description: "Non è stato possibile leggere i giorni precedentemente disabilitati",
        variant: "destructive",
        action: <Button variant="ghost" onClick={readDatesFromFile}>Riprova</Button>
      });
      return [];
    }

    const isoDates = await res.json() as string[];
    return isoDates.map(str => new Date(str));
  };

  useEffect(() => {
    readDatesFromFile().then(dates => {
      setSelectedDates(dates);
      setInitialDisabledCount(dates.length);
    });
  }, []);

  const writeDatesToFile = async () => {
    const res = await fetch("/api/disabled/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedDates), // converts dates to ISO strings
    });
    if (!res.ok) {
      toast({
        title: "Errore",
        description: "Non è stato possibile salvare i giorni disabilitati",
        variant: "destructive",
        action: <Button variant="ghost" onClick={writeDatesToFile}>Riprova</Button>
      });
    }
  };

  const handleReset = () => {
    setRangeFrom(undefined);
    setSelectedDates([]);
  }

  const handleSave = async () => {
    writeDatesToFile().catch(err => console.error(err));
    setInitialDisabledCount(selectedDates.length);
  }

  const handleDayClick: DayMouseEventHandler = (day, modifiers) => {
    let selected = Array.from(selectedDates);

    if (mode === "Range") {
      if (!rangeFrom) {
        setRangeFrom(day);
      } else if (isSameDay(day, rangeFrom)) {
        setRangeFrom(undefined);
      } else {
        const from = isBefore(rangeFrom, day) ? rangeFrom : day;
        const to = isBefore(rangeFrom, day) ? day : rangeFrom;
        const range: DateRange = { from, to };
        const dates = getDatesInRange(range);
        selected = selected.concat(dates);

        setMode("Normale");
        setRangeFrom(undefined);
      }
    } else {
      if (modifiers.selected) {
        const index = selectedDates.findIndex(d => isSameDay(day, d));
        selected.splice(index, 1);
      } else {
        selected.push(day);
      }
    }

    // Convert it first to a set to remove eventual duplicates
    const set = new Set(selected.map(date => +date));
    const dates = Array.from(set).map(time => new Date(time));
    setSelectedDates(dates);
  };

  return (
    <div className="relative size-full flex justify-center items-center gap-8 p-2">
      <div className="absolute w-full h-fit top-0 left-0 right-0 flex flex-row justify-between p-4">
        <h1 className="text-3xl">Giorni disattivati</h1>
        <div className="flex flex-col gap-2">
          <Select value={mode} onValueChange={value => setMode(value as any)} defaultValue={modes[0]}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleziona un piano..." />
            </SelectTrigger>
            <SelectContent>
              {
                modes.map(mode => (
                  <SelectItem key={mode} value={mode} onClick={() => setMode(mode as any)}>
                    {capitalize(mode)}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <Button variant="destructive" onClick={() => setConfirmDialogOpen(true)}>
          Reset
        </Button>
      </div>
      <Calendar
        fromYear={new Date().getFullYear()}
        toYear={new Date().getFullYear() + 1}
        onDayClick={handleDayClick}
        selected={selectedDates}
        footer={
          <div className="flex flex-col gap-4 mt-5">
            <h1 className="text-center">
              {selectedDates.length === 0 ? "Seleziona uno o più giorni" : `Hai selezionato ${selectedDates.length == 1 ? "1 giorno" : selectedDates.length + " giorni"}`}
            </h1>
            <Button
              onClick={async () => await handleSave()}
              className={cn(selectedDates.length === initialDisabledCount ? "hidden" : "block")}
            >
              Salva
            </Button>
          </div>
        }
        className="size-fit p-0"
      />
      <ConfirmResetDialog open={[confirmDialogOpen, setConfirmDialogOpen]} action={handleReset} />
    </div>
  );
}
