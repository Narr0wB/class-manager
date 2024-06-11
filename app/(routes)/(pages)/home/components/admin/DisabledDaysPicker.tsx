import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange, DayMouseEventHandler } from "react-day-picker";

type Props = {

}

function capitalize(value: string) {
  return value.at(0)?.toUpperCase() + value.substring(1);
}

function getDatesInRange(range: DateRange) {
  const dateArray = [];
  const from = range.from as Date;
  const to = range.to as Date;

  while (from <= to) {
    dateArray.push(from);
    from.setDate(from.getDate() + 1);
  }

  return dateArray;
}

export const DisabledDaysPicker = ({ }: Props) => {
  const modes = ["multiple", "range"];
  const [mode, setMode] = useState<"multiple" | "range">("multiple");
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [currentRange, setCurrentRange] = useState<DateRange | undefined>();

  useEffect(() => {
    console.log("Current range: " + JSON.stringify(currentRange));
  }, [currentRange?.from, currentRange?.to]);

  const handleResetClick = () => {
    setSelectedDays([]);
    setCurrentRange(undefined);
  }

  const handleDayClick: DayMouseEventHandler = (day, modifiers) => {
    console.log(day);

    const selected = [...selectedDays];

    if (mode == "range") {
      if (!currentRange?.from) {
        setCurrentRange({ from: day });
      } else if (currentRange.from && !currentRange.to) {
        setCurrentRange(prev => {
          const range: DateRange = { from: prev?.from, to: day };
          return range;
        });
        console.log(getDatesInRange(currentRange));
        setMode("multiple");
      }
    } else {
      if (modifiers.selected) {
        const index = selectedDays.findIndex(d => isSameDay(day, d));
        selected.splice(index, 1);
      } else {
        selected.push(day);
      }
      setSelectedDays(selected);
    }
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
        modifiers={{ selected: selectedDays }}
        footer={
          <div className="flex flex-row items-center gap-4">
            <h1>
              {selectedDays.length == 0 ? "Seleziona uno o più giorni" : `Hai selezionato ${selectedDays.length} giorno/i`}
            </h1>
            <Button variant="outline" onClick={handleResetClick}>
              Reset
            </Button>
          </div>
        }
        className="size-fit p-0"
      />
    </div>
  );
}