import { useEndMinutes, useStartMinutes } from '@/app/components/LayoutProvider';
import HourSelector from './HourSelector';

type HourRangeSelectorProps = {
  className?: string;
}

const HourRangeSelector: React.FC<HourRangeSelectorProps> = ({ className }) => {
  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();

  return (
    <div id="hour-range-selector" className={className}>
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