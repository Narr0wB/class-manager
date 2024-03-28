"use client"

import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Clock10Icon, MinusIcon, PlusIcon } from 'lucide-react';
import { setMinutes } from 'date-fns';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import HourInput from './hour-input';

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
    // 14:30
    const date = new Date();
    date.setHours(14);
    date.setMinutes(30);

    return date.getHours() * 60 + date.getMinutes();
  });

  const [open, setOpen] = useState(false);

  const inizioInputRef = useRef<HTMLInputElement>(null);
  const fineInputRef = useRef<HTMLInputElement>(null);

  function minutesToString(minutes: number): string {
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

  function updateRef(ref: RefObject<HTMLInputElement> | RefObject<HTMLParagraphElement>, minutes: number) {
    if (!ref.current) { return; }
    if (ref.current instanceof HTMLInputElement) {
      ref.current.value = minutesToString(minutes);
    }
    if (ref.current instanceof HTMLParagraphElement) {
      ref.current.innerText = minutesToString(minutes);
    }
  }

  useEffect(() => {
    updateRef(inizioInputRef, inizio_minutes);
  }, [inizio_minutes]);

  useEffect(() => {
    updateRef(fineInputRef, fine_minutes);
  }, [fine_minutes]);

  useEffect(() => {
    setInizioMinutes(checkBounds(inizio_minutes, "inizio"))
    setFineMinutes(checkBounds(fine_minutes, "fine"))

    updateRef(inizioTextRef, inizio_minutes);
    updateRef(fineTextRef, fine_minutes);

    updateRef(inizioInputRef, inizio_minutes);
    updateRef(fineInputRef, fine_minutes);

    setOpen(true)
  }, [inizio_minutes, fine_minutes]);

  useEffect(() => {
    console.log(open);
    if (open) {
      updateRef(inizioInputRef, inizio_minutes);
      updateRef(fineInputRef, fine_minutes);
    }
  }, [open]);

  function checkBounds(minutes: number, type: "inizio" | "fine") {
    var hours = Math.floor(minutes / 60);
    var min = minutes % 60 - minutes % 10;

    if (type === "inizio") {
      if (hours < 13) {
        hours = 13
      }
    } else {
      if ((minutes - inizio_minutes) < 60) {
        hours = Math.floor(inizio_minutes / 60) + 1;
        min = inizio_minutes % 60;
      }
    }
    return hours * 60 + min;
  }

  function inputBlur(event: React.ChangeEvent<HTMLInputElement>, setMinutes: React.Dispatch<React.SetStateAction<number>>) {
    const targetValue = event.target.valueAsDate;
    if (targetValue) {
      const hours = targetValue.getHours() - 1;
      const minutes = targetValue.getMinutes();
      setMinutes((hours * 60 + minutes));
    }
  }

  return (
    <div id={id} className={className}>
      <Drawer>
        <DrawerTrigger onClick={() => setOpen(true)} className="flex items-center text-black row-start-3 col-start-2">
          <Clock10Icon className="h-10 w-10 text-purple-600 border-[2px] border-black rounded-[10px] hover:text-purple-300 hover:border-purple-300"></Clock10Icon>
        </DrawerTrigger>
        <DrawerContent className="ml-[10%] mr-[10%] flex items-center">
          <DrawerHeader className="max-w-[60%] p-2">
            <DrawerDescription>Seleziona l'ora della prenotazione</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex items-center w-max-full w-full">
            <div className="flex justify-evenly w-max-full w-[90%]">
              <HourInput
                onClickMinus={() => {
                  const minutes = inizio_minutes - 10;
                  setInizioMinutes(checkBounds(minutes, "inizio"));
                }}
                onClickPlus={() => {
                  const minutes = inizio_minutes + 10;
                  setInizioMinutes(checkBounds(minutes, "inizio"));
                }}
                inputProps={{ onBlur: (event) => inputBlur(event, setInizioMinutes), inputRef: inizioInputRef, defaultValue: minutesToString(inizio_minutes) }}
              />
              <HourInput
                onClickMinus={() => {
                  const minutes = fine_minutes - 10;
                  setFineMinutes(checkBounds(minutes, "fine"));
                }}
                onClickPlus={() => {
                  const minutes = fine_minutes + 10;
                  setFineMinutes(checkBounds(minutes, "fine"));
                }}
                inputProps={{ onBlur: (event) => inputBlur(event, setFineMinutes), inputRef: fineInputRef, defaultValue: minutesToString(fine_minutes) }}
              />
            </div>
            <div className="flex flex-col justify-center w-[80%]">
              <DrawerClose asChild>
                <Button className="bg-purple-600 my-3 hover:bg-purple-800" onClick={() => {
                  setOpen(false);
                }}>Salva</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button className="bg-purple-400 hover:bg-purple-500" onClick={() => setOpen(false)}>Chiudi</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer >
    </div>
  )
}

export default HourDrawer;