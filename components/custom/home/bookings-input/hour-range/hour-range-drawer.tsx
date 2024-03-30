"use client"

import React, { RefObject } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import HourRangeSelector from './hour-range-selector';
import { cn } from '@/lib/utils';

type HourRangeDrawerProps = {
  id?: string;
  className?: string;
  startHourText: RefObject<HTMLParagraphElement>;
  endHourText: RefObject<HTMLParagraphElement>;
}

const HourRangeDrawer: React.FC<HourRangeDrawerProps> = ({ id, className, startHourText, endHourText }) => {
  return (
    <div id={id} className={cn("", className)}>
      <Drawer>
        <DrawerTrigger className="flex items-center text-black">Modifica...</DrawerTrigger>
        <DrawerContent className="ml-[10%] mr-[10%] flex items-center">
          <DrawerHeader className="max-w-[60%] p-2">
            <DrawerDescription>Seleziona l'ora della prenotazione</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex items-center w-max-full w-full">
            <HourRangeSelector
              startHourText={startHourText}
              endHourText={endHourText}
              className="flex justify-evenly w-max-full w-[90%]"
            />
            <div className="flex flex-col justify-center w-[80%]">
              <DrawerClose asChild>
                <Button className="bg-purple-600 my-3 hover:bg-purple-800">Salva</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button className="bg-purple-400 hover:bg-purple-500">Chiudi</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer >
    </div>
  )
}

export default HourRangeDrawer;