import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";

type Props = {

}

function capitalize(value: string) {
  return value.at(0)?.toUpperCase() + value.substring(1);
}

function stringifyRange(range: DateRange | undefined): string {
  if (!range || !range.from || !range.to) return "";
  return `Da: ${formatDate(range.from)} a: ${formatDate(range.to)}`;
}

function stringifySelected(selected: Date[]): string {
  return selected.map(date => formatDate(date)).join(", ");
}

export const DisabledDaysPicker = ({ }: Props) => {
  const modes = ["multiple", "range"];
  const [selected, setSelected] = useState<Date[]>([]);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [mode, setMode] = useState<"multiple" | "range">("multiple");

  return (
    <div className="relative size-full flex justify-center items-center gap-8 p-2">
      <div className="absolute top-5 left-5 flex flex-col gap-2">
        <Select onValueChange={value => setMode(value as any)} defaultValue={modes[0]}>
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
      {
        mode == "multiple" ? (
          <Calendar
            mode="multiple"
            selected={selected}
            onSelect={dates => setSelected(dates || [])}
            className="size-fit p-0"
          />
        ) : (
          <Calendar
            mode="range"
            selected={range}
            onSelect={range => setRange(range)}
            className="size-fit p-0"
          />
        )
      }
      <div className="absolute bottom-10 right-10 left-10">
        <h1>Selected days: {mode == "multiple" ? stringifySelected(selected) : stringifyRange(range)}</h1>
      </div>
    </div>
  );
}