"use client"

import { RefObject, useEffect, useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';

type HourDrawerProps = {
  timeTextRef: RefObject<HTMLParagraphElement>;
}

const HourDrawer: React.FC<HourDrawerProps> = ({ timeTextRef }) => {
  const [minutes, setMinutes] = useState(() => {
    const date = new Date();
    return date.getHours() * 60 + date.getMinutes();
  });

  const changeTime = (minutes: number) => {
    setMinutes(before => before + minutes);
  }

  const minutesToTimeString = (minutes: number) => {
    const date = new Date();
    date.setHours(parseInt("" + (minutes / 60)));
    date.setMinutes(minutes % 60);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.getHours() + ":" + date.getMinutes();
  };

  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className="ml-[10%] mr-[10%] flex items-center">
        <DrawerHeader className="max-w-[60%] p-0">
          <DrawerTitle>Ora</DrawerTitle>
          <DrawerDescription>Seleziona l'ora della prenotazione</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="max-w-[60%]">
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => changeTime(-10)}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  { }
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => changeTime(10)}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Button onClick={() => {
              if (timeTextRef.current) {
                timeTextRef.current.innerText = minutesToTimeString(minutes);
              }
            }}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default HourDrawer;