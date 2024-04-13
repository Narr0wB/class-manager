import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, minutesToHourString } from '@/lib/utils';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

type HourSelectorProps = {
  id?: string;
  className?: string;
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
}

const HourSelector: React.FC<HourSelectorProps> = ({ className, id, minutes, setMinutes }) => {
  function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
    const targetValue = event.target.valueAsDate;
    if (targetValue) {
      const hours = targetValue.getHours() - 1;
      const minutes = targetValue.getMinutes();
      setMinutes((hours * 60 + minutes));
    }
  }

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current == null) return;
    input.current.value = minutesToHourString(minutes);
  }, [minutes]);

  return (
    <div id={id} className={cn("flex items-center", className)}>
      <Button
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
        defaultValue={minutesToHourString(minutes)}
        ref={input}
      />
      <Button
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