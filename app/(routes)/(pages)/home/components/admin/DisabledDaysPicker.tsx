import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { isBefore, isSameDay } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { DateRange, DayMouseEventHandler } from "react-day-picker";

type Props = {
}

function capitalize(value: string) {
  return value.at(0)?.toUpperCase() + value.substring(1);
}

function getDatesInRange(range: DateRange) {
  const dateArray = [];
  const { from, to } = range;
  if (!from || !to) return [];

  while (isBefore(from, to)) {
    dateArray.push(new Date(from));
    from.setDate(from.getDate() + 1);
  }

  dateArray.push(to);

  return dateArray;
}

export const DisabledDaysPicker = ({ }: Props) => {
  const modes = ["multiple", "range"];
  const [mode, setMode] = useState<"multiple" | "range">("multiple");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [rangeFrom, setRangeFrom] = useState<Date | undefined>();
  const [initialDisabledCount, setInitialDisabledCount] = useState(0);
  const { toast } = useToast();

  async function readDatesFromFile() {
    const res = await fetch("/api/disabled/read", { method: "GET" });
    if (!res.ok) toast({
      title: "Errore",
      description: "Non è stato possibile leggere i giorni precedentemente disabilitati",
      variant: "destructive",
      action: <Button variant="ghost" onClick={readDatesFromFile}>Riprova</Button>
    });
    const dates = res.json() as any as Date[];
    return dates;
  };

  useEffect(() => {
    readDatesFromFile().then(dates => {
      setSelectedDates(dates);
      setInitialDisabledCount(dates.length);
    });
  }, []);

  const writeDatesToFile = useCallback(async () => {
    const res = await fetch("/api/disabled/write", { method: "POST", body: JSON.stringify(selectedDates) });
    if (!res.ok) toast({
      title: "Errore",
      description: "Non è stato possibile salvare i giorni disabilitati",
      variant: "destructive",
      action: <Button variant="ghost" onClick={writeDatesToFile}>Riprova</Button>
    });
  }, [selectedDates]);

  const handleResetClick = () => {
    setSelectedDates([]);
    setRangeFrom(undefined);
  }

  const handleDayClick: DayMouseEventHandler = (day, modifiers) => {
    let selected = Array.from(selectedDates);

    if (mode == "range") {
      if (!rangeFrom) setRangeFrom(day);
      else if (isSameDay(day, rangeFrom)) setRangeFrom(undefined);
      else {
        const from = isBefore(rangeFrom, day) ? rangeFrom : day;
        const to = isBefore(rangeFrom, day) ? day : rangeFrom;
        const range: DateRange = { from, to };
        const dates = getDatesInRange(range);
        selected = selected.concat(dates);

        setMode("multiple");
        setRangeFrom(undefined);
      }
    } else {
      if (modifiers.selected) {
        const index = selectedDates.findIndex(d => isSameDay(day, d));
        selected.splice(index, 1);
      }
      else selected.push(day);
    }

    // Convert it first to a set to remove eventual duplicates
    // (use timestamps instead of directly using Date objects)
    const times = new Set(selected.map(date => new Date(date).setHours(0, 0, 0, 0)));
    const dates = Array.from(times).map(time => new Date(time));
    setSelectedDates(dates);
  };

  return (
    <div className="relative size-full flex justify-center items-center gap-8 p-2">
      <div className="absolute top-5 left-5 flex flex-col gap-2">
        <Select value={mode} onValueChange={value => setMode(value as any)} defaultValue={modes[0]}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleziona un piano..." />
          </SelectTrigger>
          <SelectContent>
            {
              modes.map(mode => {
                return (
                  <SelectItem key={mode} value={mode} onClick={() => setMode(mode as any)}>
                    {capitalize(mode)}
                  </SelectItem>
                )
              })
            }
          </SelectContent>
        </Select>
        <h1>
          Current mode: {capitalize(mode)}
        </h1>
      </div>
      <Calendar
        onDayClick={handleDayClick}
        modifiers={{ selected: selectedDates }}
        footer={
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <h1>
                {selectedDates.length == 0 ? "Seleziona uno o più giorni" : `Hai selezionato ${selectedDates.length} giorno/i`}
              </h1>
              <Button variant="outline" onClick={handleResetClick}>
                Reset
              </Button>
            </div>
            <Button onClick={writeDatesToFile} className={cn(selectedDates.length == initialDisabledCount ? "hidden" : "block")}>
              Salva
            </Button>
          </div>
        }
        className="size-fit p-0"
      />
    </div>
  );
}