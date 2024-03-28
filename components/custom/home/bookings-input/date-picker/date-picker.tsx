"use client"

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DatePickerProps = {
  className?: string;
  id?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className, id }) => {
  const [date, setDate] = useState<Date>()

  return (
    <div id={id} className={className}>
      <div className="rounded-md border bg-[#F7F3E7]">
        <Calendar className="text-black" mode="single" selected={date} onSelect={setDate} />
      </div>  
    </div>
  )
}

export default DatePicker;