import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn, isDateBeforeValidDate, isDateManuallyDisabled } from "@/lib/utils";
import { isBefore, isSameDay, isSunday } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange, DayMouseEventHandler } from "react-day-picker";
import ConfirmResetDialog from "./ConfirmResetDialog";
import Spinner from "../input-section/Spinner";

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
  const [loading, setLoading] = useState(true);

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

  const writeDatesToFile = async () => {
    const res = await fetch("/api/disabled/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedDates.map(date => {
        date.setHours(0, 0, 0, 0);
        date.toISOString();
        return date;
      })),
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

  useEffect(() => {
    setLoading(true);
    readDatesFromFile().then(dates => {
      setSelectedDates(dates);
      setInitialDisabledCount(dates.length);
      setLoading(false);
    });
  }, []);

  const handleReset = () => {
    setRangeFrom(undefined);
    setSelectedDates([]);
  }

  const handleSave = async () => {
    writeDatesToFile().catch(err => console.error(err));
    setInitialDisabledCount(selectedDates.length);
  }

  // Let admins select only dates after the valid date that were not
  // selected manually. Exclude sundays
  const isDisabled = (day: Date) => (isDateBeforeValidDate(day) || isSunday(day)) && !isDateManuallyDisabled(day);

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

        // Remove disabled days (like sundays) because they shouldn't be
        // selected at all
        let filtered = dates.filter(date => !isDisabled(date));
        selected = selected.concat(filtered);

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
      <div className="absolute w-full h-fit top-0 left-0 right-0 flex flex-col md:flex-row gap-4 justify-between p-4">
        <h1 className="flex flex-row gap-2 text-3xl">
          Giorni disattivati
          {
            loading &&
            <Spinner content="" />
          }
        </h1>
        <div className="flex flex-row gap-2 md:items-end">
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
          <Button variant="destructive" className="w-fit" onClick={() => setConfirmDialogOpen(true)}>
            Reset
          </Button>
        </div>
      </div>
      <Calendar
        fromYear={new Date().getFullYear()}
        toYear={new Date().getFullYear() + 1}
        onDayClick={handleDayClick}
        selected={selectedDates}
        disabled={isDisabled}
        showOutsideDays={false}
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

export default DisabledDaysPicker;
