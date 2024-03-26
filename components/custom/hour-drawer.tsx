"use client"

import React, { RefObject, useEffect, useRef, useState } from 'react';
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
    date.setHours(13);
    date.setMinutes(30);

    return date.getHours() * 60 + date.getMinutes();
  });

  const [fine_minutes, setFineMinutes] = useState(() => {
    // 13:30
    const date = new Date();
    date.setHours(14);
    date.setMinutes(30);

    return date.getHours() * 60 + date.getMinutes();
  });

  const [open, setOpen] = useState(false);

  const inizioInputRef = useRef<HTMLInputElement>(null);
  const fineInputRef = useRef<HTMLInputElement>(null);

  function stringToMinutes(string: string) {
    const parts = string.split(":")

    const hours = parseInt(parts[0])
    const minutes = parseInt(parts[1])

    return hours * 60 + minutes
  }

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
  }, [inizio_minutes, fine_minutes]);

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

  function inizioInputBlur(event: React.ChangeEvent<HTMLInputElement>) { 

    const hours = event.target.valueAsDate?.getHours()! - 1;
    const minutes = event.target.valueAsDate?.getMinutes()! - event.target.valueAsDate?.getMinutes()! % 10;
    const final_value = hours * 60 + minutes % 60;

    event.target.value = minutesToString(final_value)

    setInizioMinutes(final_value)
  }

  function fineInputBlur(event: React.ChangeEvent<HTMLInputElement>) { 

    const hours = event.target.valueAsDate?.getHours()! - 1;
    const minutes = event.target.valueAsDate?.getMinutes()! - event.target.valueAsDate?.getMinutes()! % 10;
    const final_value = hours * 60 + minutes % 60;

    event.target.value = minutesToString(final_value)

    setFineMinutes(final_value)
  }

  return (
    <div id={id} className={className}>
      <Drawer>
        <DrawerTrigger onClick={() => setOpen(true)} className="flex items-center text-black">Modifica...</DrawerTrigger>
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
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full bg-purple-600"
                    onClick={() => setInizioMinutes(before => before - 10)}
                  >
                    <MinusIcon className="h-4 w-4" />
                    <span className="sr-only">Diminuisci</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter px-2">
                      <input type="time" onBlur={inizioInputBlur} ref={inizioInputRef} defaultValue={minutesToString(inizio_minutes)}/>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full bg-purple-600"
                    onClick={() => setInizioMinutes(before => before + 10)}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Aumenta</span>
                  </Button>
                </div>
                <div className="items-center flex px-10">
                  <Button
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full bg-purple-600"
                    onClick={() => setFineMinutes(before => before - 10)}
                  >
                    <MinusIcon className="h-5 w-5" />
                    <span className="sr-only">Diminuisci</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter px-2">
                      <input type="time" onBlur={fineInputBlur} ref={fineInputRef} defaultValue={minutesToString(fine_minutes)}/>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full bg-purple-600"
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
                  // if (inizioInputRef.current) { setInizioMinutes(stringToMinutes(inizioInputRef.current.value)); }
                  // if (fineInputRef.current) { setFineMinutes(stringToMinutes(fineInputRef.current.value)); }
                  
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