"use client"

import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import HourRangeSelector from './hour-range-selector';
import { Clock10Icon } from 'lucide-react';
import CustomTooltip from '@/components/custom/custom-tooltip';

type HourRangeDrawerProps = {
  className?: string;
}

const HourRangeDrawer: React.FC<HourRangeDrawerProps> = ({ className }) => {
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
        <DrawerContent id="drawer-content" className="fixed bottom-0 mx-[10%] md:mx-[20%] lg:mx-[30%] flex items-center lg:xl:2xl">
          <DrawerHeader id="drawer-header">
            <DrawerDescription>Seleziona l'ora della prenotazione</DrawerDescription>
          </DrawerHeader>
          <HourRangeSelector className="w-min wmd:w-[75%] flex flex-col justify-evenly space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:lg:xl:2xl" />
          <DrawerFooter id="drawer-footer" className="flex items-center w-full h-full">
            <div className="w-[75%] flex flex-col gap-2 justify-center">
              <DrawerClose asChild>
                <Button>Salva</Button>
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