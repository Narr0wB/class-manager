import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, minutesToString } from '@/lib/utils';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

type HourSelectorProps = {
  id?: string;
  className?: string;
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  disabledPlus: boolean;
  disabledMinus: boolean
}

const HourSelector: React.FC<HourSelectorProps> = ({ className, id, minutes, setMinutes, disabledMinus, disabledPlus }) => {
  function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
    const targetValue = event.target.valueAsDate;
    if (targetValue) {
      const hours = targetValue.getHours() - 1;
      const minutes = targetValue.getMinutes();
      setMinutes(hours * 60 + minutes);
    }
  }

  // We use this ref to update the value of the input displayed
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current == null) return;
    input.current.value = minutesToString(minutes);
  }, [minutes]);

  return (
    <div id={id} className={cn("h-max flex items-center space-x-2", className)}>
      <Button
        disabled={disabledMinus}
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => setMinutes(prev => prev - 10)}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Diminuisci</span>
      </Button>
      <Input
        type="time"
        onBlur={handleBlur}
        defaultValue={minutesToString(minutes)}
        ref={input}
        className="h-max text-center text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl"
      />
      <Button
        disabled={disabledPlus}
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => setMinutes(prev => prev + 10)}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Aumenta</span>
      </Button>
    </div>
  )
}

export default HourSelector;