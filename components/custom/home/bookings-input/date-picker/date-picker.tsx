"use client"

import { cn } from '@/lib/utils';
import { RefObject, useState } from 'react';
import { TimeFrame } from '@/lib/backend/database';
import { Calendar } from '@/components/ui/calendar';

type DatePickerProps = {
  className?: string;
  id?: string;
  timeFrameRef: RefObject<TimeFrame>
}

const DatePicker: React.FC<DatePickerProps> = ({ className, id, timeFrameRef }) => {
  const [date, setDate] = useState<Date>()

  return (
    <div id={id} className={cn(className, "flex justify-center rounded-md border bg-[#F7F3E7]")}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => {
          if (timeFrameRef.current) {
            timeFrameRef.current.data = date!;
          }
          setDate(date);
        }} />
    </div>
  )
}

export default DatePicker;