import HourSelector from './HourSelector';

type HourRangeSelectorProps = {
  className?: string;
  start: [number, React.Dispatch<React.SetStateAction<number>>]
  end: [number, React.Dispatch<React.SetStateAction<number>>];
}

const HourRangeSelector: React.FC<HourRangeSelectorProps> = ({ className, start, end }) => {
  const [startMinutes, setStartMinutes] = start;
  const [endMinutes, setEndMinutes] = end;

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