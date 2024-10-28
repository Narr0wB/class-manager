"use client"

import { cn, getLocaleDate, getValidMonthDate, isDateBeforeValidDate, isDateManuallyDisabled, stringToDate } from '@/lib/utils';
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
  const currentMonth = new Date().getMonth();

  const isDisabled = (date: Date) => isDateManuallyDisabled(date) || isSunday(date) || isDateBeforeValidDate(date);

  return (
    <div id="date-picker" className={cn(className, "overflow-auto flex justify-center")}>
      <Calendar
        mode="single"
        selected={timeframe.data}
        // If we are in a month that is before September, then our AS is CurrentYear - 1 / CurrentYear
        // else, if we are in September or after, then our AS is CurrentYear / CurrentYear + 1
        fromDate={stringToDate(config.min.data, currentMonth < 9 ? currentYear - 1 : currentYear)}
        toDate={stringToDate(config.max.data, currentMonth < 9 ? currentYear : currentYear + 1)}
        disabled={isDisabled}
        defaultMonth={getValidMonthDate()}
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
