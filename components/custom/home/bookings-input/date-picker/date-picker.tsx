"use client"

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RefObject, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeFrame } from '@/lib/backend/database';

type DatePickerProps = {
  className?: string;
  id?: string;
  timeFrameRef: RefObject<TimeFrame>
}

const DatePicker: React.FC<DatePickerProps> = ({ className, id, timeFrameRef }) => {
  const [date, setDate] = useState<Date>()

  return (
    <div id={id} className={cn(className, "flex justify-center")}>
      <div className="rounded-md border bg-[#F7F3E7]">
        <Calendar className="text-black" mode="single" selected={date} onSelect={(date) => {if (timeFrameRef.current) {timeFrameRef.current.data = date!;} setDate(date)}} />
      </div>  
    </div>
  )
}

export default DatePicker;