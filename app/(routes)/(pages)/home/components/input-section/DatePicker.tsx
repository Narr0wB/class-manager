"use client"

import { cn } from '@/lib/utils';
import { RefObject, useEffect, useState } from 'react';
import { TimeFrame } from '@/lib/backend/database';
import { Calendar } from '@/components/ui/calendar';
import { useTimeframe } from '../HomeProvider';

type DatePickerProps = {
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className }) => {
  const [date, setDate] = useState<Date>()
  const [timeframe, setTimeframe] = useTimeframe();

  return (
    <div id="date-picker" className={cn(className, "overflow-auto")}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => {
          if (!date) return;
          
          date = new Date(date.getTime() + Math.abs(date?.getTimezoneOffset() * 60000))
          setTimeframe((prevState) => {
            const t: TimeFrame = {
              inizio: prevState.inizio,
              fine: prevState.fine,
              data: date
            };
            return t;
          })
          setDate(date);
        }}
        className="w-fit h-fit"
      />
    </div>
  )
}

export default DatePicker;