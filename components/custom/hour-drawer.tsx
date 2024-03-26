"use client"

import { RefObject, useEffect, useRef, useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';

type HourDrawerProps = {
  id?: string;
  className?: string;
  inizioTextRef: RefObject<HTMLParagraphElement>;
  fineTextRef: RefObject<HTMLParagraphElement>;
}

const HourDrawer: React.FC<HourDrawerProps> = ({ id, className, inizioTextRef, fineTextRef }) => {
  const [inizio_minutes, setInizioMinutes] = useState(() => {
    // 13:30
    const date = new Date();
    date.setHours(10);
    date.setMinutes(45);

    return date.getHours() * 60 + date.getMinutes();
  });

  const [fine_minutes, setFineMinutes] = useState(() => {
    // 13:30
    const date = new Date();
    date.setHours(10);
    date.setMinutes(45);

    return date.getHours() * 60 + date.getMinutes();
  });

  const [open, setOpen] = useState(false);

  const inizioInputRef = useRef<HTMLInputElement>(null);
  const fineInputRef = useRef<HTMLInputElement>(null);

  function minutesToString(minutes: number) {
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

  useEffect(() => {
    updateInizioInputRef();
  }, [inizio_minutes]);

  useEffect(() => {
    updateFineInputRef();
  }, [fine_minutes]);

  function updateInizioTextRef() {
    if (!inizioTextRef.current) {
      return;
    }

    inizioTextRef.current.innerText = minutesToString(inizio_minutes);

    // ???
    //if (timeInputRef.current) inizioTextRef.current.innerText = timeInputRef.current.value;
  }

  function updateFineTextRef() {
    if (!fineTextRef.current) {
      return
    }

    fineTextRef.current.innerText = minutesToString(fine_minutes);

    // ???
    //if (timeInputRef.current) inizioTextRef.current.innerText = timeInputRef.current.value;
  }

  // Empty dependencies array to run only once
  useEffect(() => {
    updateInizioTextRef();
    updateFineTextRef();
  }, []);

  function updateInizioInputRef() {
    if (!inizioInputRef.current) { return; }

    inizioInputRef.current.value = minutesToString(inizio_minutes);
    setInizioMinutes(inizio_minutes);
  }

  function updateFineInputRef() {
    if (!fineInputRef.current) { return; }
    
    fineInputRef.current.value = minutesToString(fine_minutes);
    setFineMinutes(fine_minutes);
  }

  useEffect(() => {
    console.log(open);
    if (open) {
      updateInizioInputRef();
      updateFineInputRef();
    }
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
                <div className="items-center flex px-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => setInizioMinutes(before => before - 10)}
                  >
                    <MinusIcon className="h-4 w-4" />
                    <span className="sr-only">Diminuisci</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      <input type="time" ref={inizioInputRef} />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => setInizioMinutes(before => before + 10)}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Aumenta</span>
                  </Button>
                </div>
                <div className="items-center flex px-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => setFineMinutes(before => before - 10)}
                  >
                    <MinusIcon className="h-4 w-4" />
                    <span className="sr-only">Diminuisci</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      <input type="time" ref={fineInputRef} />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => setFineMinutes(before => before + 10)}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Aumenta</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <DrawerClose asChild>
                <Button className="" onClick={() => {
                  updateInizioTextRef();
                  updateFineTextRef();
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