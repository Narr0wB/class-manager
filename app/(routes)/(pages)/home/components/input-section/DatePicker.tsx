"use client"

import { cn, getLocaleDate, isDateBeforeValidDate, isDateDisabled, stringToDate } from '@/lib/utils';
import { TimeFrame } from '@/lib/backend/database';
import { Calendar } from '@/components/ui/calendar';
import { useTimeframe } from '../HomeProvider';
import { useState, useEffect } from 'react'

import config from "@/public/config.json";
import { isSunday } from 'date-fns';

type DatePickerProps = {
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className }) => {
  const [timeframe, setTimeframe] = useTimeframe();
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    readDatesFromFile().then(dates => {
      setDisabledDates(dates);
    });
  }, []);

  async function readDatesFromFile() {
    const res = await fetch("/api/disabled/read", { method: "GET" });
    if (!res.ok) {
        console.log("TODO: Handle this case!!!") 
    }

    const isoDates = await res.json() as string[];
    return isoDates.map(str => new Date(str));
  };

  return (
    <div id="date-picker" className={cn(className, "overflow-auto flex justify-center")}>
      <Calendar
        mode="single"
        selected={timeframe.data}
        // If we are in a month that is before September, then our AS is CurrentYear - 1 / CurrentYear
        // else, if we are in September or after, then our AS is CurrentYear / CurrentYear + 1
        fromDate={stringToDate(config.min.data, currentMonth < 9 ? currentYear - 1 : currentYear)}
        toDate={stringToDate(config.max.data, currentMonth < 9 ? currentYear : currentYear + 1)}
        disabled={date => isDateDisabled(date, disabledDates) || isSunday(date) || isDateBeforeValidDate(date)}
        onSelect={date => {
          if (!date) return;
          const formatted = getLocaleDate(date);

          setTimeframe(prev => {
            const t: TimeFrame = {
              inizio: prev.inizio,
              fine: prev.fine,
              data: formatted
            };
            return t;
          });
        }}
        className="size-fit p-0"
      />
    </div>
  )
}

export default DatePicker;
