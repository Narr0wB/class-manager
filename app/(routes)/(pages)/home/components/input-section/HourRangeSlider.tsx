import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn, minutesToString } from "@/lib/utils"
import { useEndMinutes, useStartMinutes } from "@/app/components/LayoutProvider"
import { useTimeframe } from "../HomeProvider"
import { TimeFrame } from "@/lib/backend/database"

const HourRangeSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(({ className, ...props }, ref) => {
  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();
  const [timeframe, setTimeframe] = useTimeframe();

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={13 * 60}
      max={18 * 60}
      defaultValue={[startMinutes, endMinutes]}
      step={10}
      onValueChange={value => {
        setStartMinutes(value[0]);
        setEndMinutes(value[1]);

        setTimeframe(prev => {
          const t: TimeFrame = {
            inizio: startMinutes,
            fine: endMinutes,
            data: prev.data
          };
          return t;
        });
      }}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb>
        {minutesToString(startMinutes)}
        <div className="size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Thumb>
      <SliderPrimitive.Thumb className="block size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  )
})
HourRangeSlider.displayName = SliderPrimitive.Root.displayName

export { HourRangeSlider }
