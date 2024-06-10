"use client"

import { cn, stringToDate } from '@/lib/utils';
import { TimeFrame } from '@/lib/backend/database';
import { Calendar } from '@/components/ui/calendar';
import { useTimeframe } from '../HomeProvider';

import config from "@/public/config.json";

type DatePickerProps = {
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className }) => {
  const [timeframe, setTimeframe] = useTimeframe();
  const currentYear = new Date(Date.now()).getFullYear();

  return (
    <div id="date-picker" className={cn(className, "overflow-auto flex justify-center")}>
      <Calendar
        mode="single"
        selected={timeframe.data}
        fromDate={stringToDate(config.min.data, currentYear)}
        toDate={stringToDate(config.max.data, currentYear)}
        disabled={date => date.getDay() == 0}
        onSelect={date => {
          if (!date) return;
          const formatted = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));

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