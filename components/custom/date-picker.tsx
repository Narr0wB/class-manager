"use client"

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type DatePickerProps = {
  className?: string;
  id?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className, id }) => {
  const [date, setDate] = useState<Date>()

  return (
    <div id={id} className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Seleziona una data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Oggi</SelectItem>
              <SelectItem value="1">Domani</SelectItem>
              <SelectItem value="3">Fra 3 giorni</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker;