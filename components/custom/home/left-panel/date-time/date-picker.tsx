"use client"

import { cn } from '@/lib/utils';
import { RefObject, useState } from 'react';
import { TimeFrame } from '@/lib/backend/database';
import { Calendar } from '@/components/ui/calendar';

type DatePickerProps = {
  className?: string;
  timeFrameRef: RefObject<TimeFrame>
}

const DatePicker: React.FC<DatePickerProps> = ({ className, timeFrameRef }) => {
  const [date, setDate] = useState<Date>()

  return (
    <div id="date-picker" className={cn(className, "")}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => {
          if (timeFrameRef.current) {
            timeFrameRef.current.data = date!;
          }
          setDate(date);
        }}
      />
    </div>
  )
}

export default DatePicker;