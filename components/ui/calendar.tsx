"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DayPickerProvider } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const daysOfWeek = ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'];
const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

const locale = {
  localize: {
    day: (n: number) => daysOfWeek[n],
    month: (n: number) => months[n]
  },
  formatLong: {
    date: () => 'mm/dd/yyyy'
  }
}

// Dopo le 13 non si può più prenotare per quel giorno
function getTodayValid() {
  if (new Date().getHours() > 13) {
    return new Date(new Date().setDate(new Date().getDate()));
  }
  else {
    return new Date(new Date().setDate(new Date().getDate() - 1))
  }
}

const disabledDays = [
  { from: new Date(new Date().setMonth(new Date().getMonth() - 100)), to: getTodayValid() },
  { from: new Date(new Date().setMonth(new Date().getMonth() + 1)), to: new Date(new Date().setMonth(new Date().getMonth() + 100)) }
];

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      disabled={disabledDays}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants(),
          "h-7 w-7 bg-purple-600 p-0 opacity-100 hover:bg-purple-400"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-purple-400"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-purple-600 text-white hover:bg-purple-700 focus:bg-purple-600",
        day_today: "text-black",
        day_outside:
          "day-outside text-black aria-selected:text-white aria-selected:opacity-100",
        //day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }