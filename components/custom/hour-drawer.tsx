"use client"

import { RefObject, useEffect, useRef, useState } from 'react';
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

  const [open, setOpen] = useState(false);

  function minutesToString() {
    const date = new Date();

    date.setHours(parseInt("" + (minutes / 60)));
    date.setMinutes(minutes % 60);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const digits = (num: number) => {
      return num.toString().length
    }

    const mins = date.getMinutes();
    const minsString = digits(mins) > 1 ? mins.toString() : "0" + mins;

    return date.getHours() + ":" + minsString;
  }

  const timeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!timeInputRef.current) return;

    timeInputRef.current.value = minutesToString();
  }, [minutes]);

  function updateTimeTextRef() {
    if (!timeTextRef.current) return;
    timeTextRef.current.innerText = minutesToString();

    if (timeInputRef.current) timeTextRef.current.innerText = timeInputRef.current.value;

  }

  // Empty dependencies array to run only once
  useEffect(() => {
    updateTimeTextRef();
  }, []);

  function updateInputTextRef() {
    if (!timeInputRef.current) return;
    timeInputRef.current.value = minutesToString();
  }

  useEffect(() => {
    console.log(open);
    if (open) updateInputTextRef();
  }, [open]);

  return (
    <div id={id} className={className}>
      <Drawer>
        <DrawerTrigger onClick={() => setOpen(true)} className="flex">Apri</DrawerTrigger>
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
                  onClick={() => setMinutes(before => before - 10)}
                >
                  <MinusIcon className="h-4 w-4" />
                  <span className="sr-only">Diminuisci</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    <input type="datetime-local" ref={timeInputRef} />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setMinutes(before => before + 10)}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Aumenta</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <DrawerClose asChild>
                <Button onClick={() => {
                  updateTimeTextRef();
                  setOpen(false);
                }}>Salva</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button onClick={() => setOpen(false)} variant="outline">Chiudi</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer >
    </div>
  )
}

export default HourDrawer;