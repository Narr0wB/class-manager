"use client"

import React, { useEffect } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import HourRangeSelector from './HourRangeSelector';
import { Clock10Icon } from 'lucide-react';
import CustomTooltip from '@/components/custom/CustomTooltip';
import { useTimeframe } from '../HomeProvider';
import { TimeFrame } from '@/lib/backend/database';
import { useEndMinutes, useStartMinutes } from '@/app/components/LayoutProvider';
import { cn } from '@/lib/utils';

type HourRangeDrawerProps = {
} & React.HTMLAttributes<HTMLButtonElement>

const HourRangeDrawer: React.FC<HourRangeDrawerProps> = (props) => {
  const [timeframe, setTimeframe] = useTimeframe();
  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();

  function inStartBounds(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;

    if (hours < 13) {
      return 13 * 60;
    }
    if (hours >= 17) {
      return 17 * 60;
    }
    if ((min % 10) != 0) {
      min -= min % 10;
      return hours * 60 + min;
    }

    return 0;
  }

  function inEndBounds(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;

    if ((min % 10) != 0) {
      min -= min % 10;
      return hours * 60 + min;
    }
    if ((minutes - startMinutes) < 60) {
      hours = Math.floor(startMinutes / 60) + 1;
      min = startMinutes % 60;

      return hours * 60 + min;
    } else if (hours >= 18) {
      return 18 * 60;
    }

    return 0;
  }

  useEffect(() => {
    let b = inStartBounds(startMinutes);

    if (b != 0) {
      setStartMinutes(b);
    }

    b = inEndBounds(endMinutes);

    if (b != 0) {
      setEndMinutes(b);
    }
  }, [startMinutes, endMinutes]);

  const { className, ...others } = props;

  return (
    <Drawer>
      <CustomTooltip content="Seleziona l'ora" side="bottom">
        <DrawerTrigger asChild>
          <Button id="hour-range-drawer-open" className={cn("grow-0 aspect-square p-2", className)} {...others}>
            <Clock10Icon className="size-full" />
          </Button>
        </DrawerTrigger>
      </CustomTooltip>
      <DrawerContent id="drawer-content" className="fixed bottom-0 mx-[10%] md:mx-[15%] lg:mx-[20%] flex items-center lg:xl:2xl">
        <DrawerHeader id="drawer-header">
          <DrawerDescription>Seleziona l'ora della prenotazione</DrawerDescription>
        </DrawerHeader>
        <HourRangeSelector className="w-fit md:w-3/4 h-max flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:lg:xl:2xl" />
        <DrawerFooter id="drawer-footer" className="flex items-center w-full h-full">
          <div className="w-3/4 flex flex-col gap-2 justify-center">
            <DrawerClose asChild>
              <Button onClick={
                () => {
                  setTimeframe(prev => {
                    const t: TimeFrame = {
                      inizio: startMinutes,
                      fine: endMinutes,
                      data: prev.data
                    };
                    return t;
                  });
                }}>
                Salva
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="secondary">Chiudi</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer >
  )
}

export default HourRangeDrawer;