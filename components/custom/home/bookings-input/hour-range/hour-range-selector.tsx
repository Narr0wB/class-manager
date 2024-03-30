import { cn, minutesToHourString } from '@/lib/utils';
import HourSelector from './hour-selector';
import { RefObject, useEffect, useRef, useState } from 'react';

function inputBlur(event: React.ChangeEvent<HTMLInputElement>, setMinutes: React.Dispatch<React.SetStateAction<number>>) {
  const targetValue = event.target.valueAsDate;
  if (targetValue) {
    const hours = targetValue.getHours() - 1;
    const minutes = targetValue.getMinutes();
    setMinutes((hours * 60 + minutes));
  }
}

function updateRef(ref: RefObject<HTMLInputElement> | RefObject<HTMLParagraphElement>, minutes: number) {
  if (!ref.current) { return; }
  if (ref.current instanceof HTMLInputElement) {
    ref.current.value = minutesToHourString(minutes);
  }
  if (ref.current instanceof HTMLParagraphElement) {
    ref.current.innerText = minutesToHourString(minutes);
  }
}

type HourRangeSelectorProps = {
  className?: string;
  startHourText: RefObject<HTMLParagraphElement>;
  endHourText: RefObject<HTMLParagraphElement>;
}

const HourRangeSelector: React.FC<HourRangeSelectorProps> = ({ className, startHourText, endHourText }) => {
  const [startMinutes, setStartMinutes] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);

  function fitInBounds(minutes: number, bound: "start" | "end") {
    var hours = Math.floor(minutes / 60);
    var min = minutes % 60 - minutes % 10;

    if (bound === "start") {
      if (hours < 13) {
        hours = 13
      }
    } else {
      if ((minutes - startMinutes) < 60) {
        hours = Math.floor(startMinutes / 60) + 1;
        min = startMinutes % 60;
      }
    }
    return hours * 60 + min;
  }

  useEffect(() => {
    // Run this once
    setStartMinutes(13 * 60 + 30);
    setEndMinutes(14 * 60 + 30);
  }, []);

  useEffect(() => {
    updateRef(startHourInput, startMinutes);
    updateRef(startHourText, startMinutes);
  }, [startMinutes]);

  useEffect(() => {
    updateRef(endHourInput, endMinutes);
    updateRef(endHourText, endMinutes);
  }, [endMinutes]);

  const startHourInput = useRef<HTMLInputElement>(null);
  const endHourInput = useRef<HTMLInputElement>(null);

  return (
    <div className={cn('', className)}>
      <HourSelector
        onClickMinus={() => setStartMinutes(prev => fitInBounds(prev - 10, "start"))}
        onClickPlus={() => setStartMinutes(prev => fitInBounds(prev + 10, "start"))}
        inputProps={{ onBlur: (e) => inputBlur(e, setStartMinutes), inputRef: startHourInput, defaultValue: startMinutes }}
      />
      <HourSelector
        onClickMinus={() => setEndMinutes(prev => fitInBounds(prev - 10, "end"))}
        onClickPlus={() => setEndMinutes(prev => fitInBounds(prev + 10, "end"))}
        inputProps={{ onBlur: (e) => inputBlur(e, setEndMinutes), inputRef: endHourInput, defaultValue: endMinutes }}
      />
    </div>
  )
}

export default HourRangeSelector;