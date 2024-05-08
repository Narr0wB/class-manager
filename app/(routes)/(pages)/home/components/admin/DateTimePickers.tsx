import { Input } from "@/components/ui/input";
import { useState } from "react";

type DateTimePickerProps = {
} & React.InputHTMLAttributes<HTMLInputElement>

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Input id="date-time-picker" type="datetime-local" {...props} />
  )
}

DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;