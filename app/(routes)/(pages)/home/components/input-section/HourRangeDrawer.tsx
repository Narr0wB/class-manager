"use client"

import React, { useEffect, useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import HourRangeSelector from './HourRangeSelector';
import { Clock10Icon } from 'lucide-react';
import CustomTooltip from '@/components/custom/CustomTooltip';
import { useTimeframe } from '../HomeProvider';
import { TimeFrame } from '@/lib/backend/database';

type HourRangeDrawerProps = {
  className?: string;
}

const HourRangeDrawer: React.FC<HourRangeDrawerProps> = ({ className }) => {
  const [timeframe, setTimeframe] = useTimeframe();
  const [startMinutes, setStartMinutes] = useState(13 * 60 + 30);
  const [endMinutes, setEndMinutes] = useState(14 * 60 + 30);

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

  return (
    <div id="hour-range-drawer" className={className}>
      <Drawer>
        <CustomTooltip content="Seleziona l'ora" side="bottom">
          <DrawerTrigger asChild>
            <Button className="w-full aspect-square p-2">
              <Clock10Icon className="h-10 w-10" />
            </Button>
          </DrawerTrigger>
        </CustomTooltip>
        <DrawerContent id="drawer-content" className="fixed bottom-0 mx-[10%] md:mx-[15%] lg:mx-[20%] flex items-center lg:xl:2xl">
          <DrawerHeader id="drawer-header">
            <DrawerDescription>Seleziona l'ora della prenotazione</DrawerDescription>
          </DrawerHeader>
          <HourRangeSelector
            start={[startMinutes, setStartMinutes]}
            end={[endMinutes, setEndMinutes]}
            className="w-fit md:w-[75%] h-max flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:lg:xl:2xl"
          />
          <DrawerFooter id="drawer-footer" className="flex items-center w-full h-full">
            <div className="w-[75%] flex flex-col gap-2 justify-center">
              <DrawerClose asChild>
                <Button
                  onClick={() => {
                    setTimeframe(prev => {
                      const t: TimeFrame = {
                        inizio: startMinutes,
                        fine: endMinutes,
                        data: prev.data
                      };
                      return t;
                    });
                  }}
                >
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
    </div>
  )
}

export default HourRangeDrawer;