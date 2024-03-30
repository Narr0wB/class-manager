import { Button } from '@/components/ui/button';
import { cn, minutesToHourString } from '@/lib/utils';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { FocusEventHandler, RefObject } from 'react';

type InputProps = {
  onBlur: FocusEventHandler<HTMLInputElement>;
  inputRef: RefObject<HTMLInputElement>;
  defaultValue: number;
}

type HourSelectorProps = {
  id?: string;
  className?: string;
  onClickMinus: () => void;
  onClickPlus: () => void;
  inputProps: InputProps;
}

const HourSelector: React.FC<HourSelectorProps> = ({
  className,
  id,
  onClickMinus,
  onClickPlus,
  inputProps: { onBlur, inputRef, defaultValue }
}) => {
  return (
    <div id={id} className={cn("items-center flex", className)}>
      <Button
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full bg-purple-600"
        onClick={onClickMinus}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Diminuisci</span>
      </Button>
      <div className="flex-1 text-center">
        <div className="sm:text-5xl md:text-7xl font-bold tracking-tighter px-2 transition-all">
          <input
            className="rounded-sm"
            type="time"
            onBlur={onBlur}
            ref={inputRef}
            defaultValue={minutesToHourString(defaultValue)}
          />
        </div>
      </div>
      <Button
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full bg-purple-600"
        onClick={onClickPlus}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Aumenta</span>
      </Button>
    </div>
  )
}

export default HourSelector;