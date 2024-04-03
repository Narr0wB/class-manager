"use client"

import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import HourRangeSelector from './hour-range-selector';
import { cn } from '@/lib/utils';
import { Clock10Icon } from 'lucide-react';
import CustomTooltip from '@/components/custom/custom-tooltip';

type HourRangeDrawerProps = {
  id?: string;
  className?: string;
}

const HourRangeDrawer: React.FC<HourRangeDrawerProps> = ({ id, className }) => {
  return (
    <div id={id} className={cn("", className)}>
      <Drawer>
        <CustomTooltip content="Seleziona l'ora">
          <DrawerTrigger>
            <Button className="w-full aspect-square p-2">
              <Clock10Icon className="h-10 w-10" />
            </Button>
          </DrawerTrigger>
        </CustomTooltip>
        <DrawerContent className="ml-[10%] mr-[10%] flex items-center">
          <DrawerHeader className="max-w-[60%] p-2">
            <DrawerDescription>Seleziona l'ora della prenotazione</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex items-center w-max-full w-full">
            <HourRangeSelector className="flex justify-evenly w-max-full w-[90%]"
            />
            <div className="flex flex-col justify-center w-[80%]">
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