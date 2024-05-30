"use client"

import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import HourRangeSelector from './HourRangeSelector';
import CustomTooltip from '@/components/custom/CustomTooltip';
import { useTimeframe } from '../HomeProvider';
import { TimeFrame } from '@/lib/backend/database';
import { useEndMinutes, useStartMinutes } from '@/app/components/LayoutProvider';
import { cn } from '@/lib/utils';

type HourRangeDrawerProps = {
} & React.HTMLAttributes<HTMLButtonElement>

const HourRangeDrawer: React.FC<HourRangeDrawerProps> = (props) => {
  const [_, setTimeframe] = useTimeframe();
  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();

  const { className, children, ...others } = props;

  return (
    <Drawer>
      <CustomTooltip content="Seleziona l'ora" side="bottom">
        <DrawerTrigger asChild>
          <Button id="hour-range-drawer-open" variant="ghost" className={cn("size-max p-2", className)} {...others}>
            {children}
          </Button>
        </DrawerTrigger>
      </CustomTooltip>
      <DrawerContent id="drawer-content" className="fixed bottom-0 mx-[10%] md:mx-[15%] lg:mx-[20%] flex items-center lg:xl:2xl">
        <DrawerHeader id="drawer-header">
          <DrawerDescription>{"Seleziona l'ora della prenotazione"}</DrawerDescription>
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
