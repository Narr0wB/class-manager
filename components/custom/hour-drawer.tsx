"use client"

import { RefObject, useEffect, useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';

type HourDrawerProps = {
  id?: string;
  className?: string;
  timeTextRef: RefObject<HTMLParagraphElement>;
}

const HourDrawer: React.FC<HourDrawerProps> = ({ id, className, timeTextRef }) => {
  const [minutes, setMinutes] = useState(() => {
    // 13:30
    const date = new Date();
    date.setHours(13);
    date.setMinutes(30);

    return date.getHours() * 60 + date.getMinutes();
  });

  function timeText() {
    const date = new Date();
    date.setHours(parseInt("" + (minutes / 60)));
    date.setMinutes(minutes % 60);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.getHours() + ":" + date.getMinutes();
  }

  function updateTimeTextRef() {
    if (!timeTextRef.current) return;

    timeTextRef.current.innerText = timeText();
  }

  // Empty dependencies array to run only once
  useEffect(() => {
    updateTimeTextRef();
  }, []);

  return (
    <div id={id} className={className}>
      <Drawer>
        <DrawerTrigger className="flex">Apri</DrawerTrigger>
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
                  onClick={() => setMinutes(before => before + 10)}
                >
                  <MinusIcon className="h-4 w-4" />
                  <span className="sr-only">Diminuisci</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {timeText()}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setMinutes(before => before - 10)}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Aumenta</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <DrawerClose asChild>
                <Button onClick={updateTimeTextRef}>Salva</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Chiudi</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer >
    </div>
  )
}

export default HourDrawer;