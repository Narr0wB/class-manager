"use client"

import { cn, getLocaleDate, isDateBeforeValidDate, isDateDisabled, stringToDate } from '@/lib/utils';
import { TimeFrame } from '@/lib/backend/database';
import { Calendar } from '@/components/ui/calendar';
import { useTimeframe } from '../HomeProvider';

import config from "@/public/config.json";
import { isSunday } from 'date-fns';

type DatePickerProps = {
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className }) => {
  const [timeframe, setTimeframe] = useTimeframe();
  const currentYear = new Date().getFullYear();

  return (
    <div id="date-picker" className={cn(className, "overflow-auto flex justify-center")}>
      <Calendar
        mode="single"
        selected={timeframe.data}
        fromDate={stringToDate(config.min.data, currentYear - 1)}
        toDate={stringToDate(config.max.data, currentYear)}
        disabled={date => isDateDisabled(date) || isSunday(date) || isDateBeforeValidDate(date)}
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