"use client"

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { TimeFrame } from '@/lib/backend/database';
import { Calendar } from '@/components/ui/calendar';
import { useTimeframe } from '../HomeProvider';

type DatePickerProps = {
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className }) => {
  const [date, setDate] = useState<Date>(() => {
    const todayDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(todayDate.getDate() + 1);

    return todayDate.getHours() > 13 ? tomorrowDate : todayDate;
  });
  const [timeframe, setTimeframe] = useTimeframe();

  return (
    <div id="date-picker" className={cn(className, "overflow-auto")}>
      <Calendar
        mode="single"
        selected={date}
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
          setDate(formatted);
        }}
        className="w-fit h-fit"
      />
    </div>
  )
}

export default DatePicker;