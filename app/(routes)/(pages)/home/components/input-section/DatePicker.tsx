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
          setTimeframe((prevState) => {
            prevState.data = date!
            return prevState;
          })
          setDate(date);
        }}
        className="w-fit h-fit"
      />
    </div>
  )
}

export default DatePicker;