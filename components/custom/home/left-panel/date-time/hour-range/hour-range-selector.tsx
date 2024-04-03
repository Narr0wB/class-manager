import { cn } from '@/lib/utils';
import HourSelector from './hour-selector';
import { useEndMinutes, useStartMinutes } from '../../hour-provider';

type HourRangeSelectorProps = {
  className?: string;
}

const HourRangeSelector: React.FC<HourRangeSelectorProps> = ({ className }) => {
  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();

  return (
    <div className={cn('', className)}>
      <HourSelector
        id="start-selector"
        minutes={startMinutes}
        setMinutes={setStartMinutes}
      />
      <HourSelector
        id="end-selector"
        minutes={endMinutes}
        setMinutes={setEndMinutes}
      />
    </div>
  )
}

export default HourRangeSelector;