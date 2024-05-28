import { useEndMinutes, useStartMinutes } from '@/app/components/LayoutProvider';
import HourSelector from './HourSelector';
import { useEffect } from 'react';
import config from "@/public/config.json";

type HourRangeSelectorProps = {
  className?: string;
}

const HourRangeSelector: React.FC<HourRangeSelectorProps> = ({ className }) => {
  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();

  const minDurataPrenotazione = config.min.ore_durata_prenotazione * 60;
  const minOra = config.min.ora_prenotazione * 60;
  const maxOra = config.max.ora_prenotazione * 60;
  const step = config.minuti_step;

  function checkDuration() {
    const diff = endMinutes - startMinutes;

    if (diff < minDurataPrenotazione) {
      if ((startMinutes + minDurataPrenotazione) > maxOra) {
        setStartMinutes(maxOra - minDurataPrenotazione);
      }
      else if ((endMinutes - minDurataPrenotazione) < minOra) {
        setEndMinutes(minOra + minDurataPrenotazione);
      }
      else {
        const isStartProblem = startMinutes > (endMinutes - minDurataPrenotazione);
        isStartProblem ? setStartMinutes(endMinutes - minDurataPrenotazione) : setEndMinutes(startMinutes + minDurataPrenotazione);
      }
    }
  }

  function checkBounds() {
    let startHours = Math.floor(startMinutes / 60);
    let startMin = startMinutes % 60;
    let endHours = Math.floor(endMinutes / 60);
    let endMin = endMinutes % 60;

    if ((startMin % step) != 0) {
      startMin -= startMin % step;
      setStartMinutes(startHours * 60 + startMin);
    }
    else if ((endMin % step) != 0) {
      endMin -= endMin % step;
      setEndMinutes(endHours * 60 + endMin);
    }

    return 0;
  }

  useEffect(() => {
    checkDuration();
    checkBounds();
  }, [startMinutes, endMinutes]);

  return (
    <div id="hour-range-selector" className={className}>
      <HourSelector
        id="start-selector"
        min={minOra}
        max={maxOra - minDurataPrenotazione}
        minutes={startMinutes}
        setMinutes={setStartMinutes}
      />
      <HourSelector
        id="end-selector"
        min={minOra + minDurataPrenotazione}
        max={maxOra}
        minutes={endMinutes}
        setMinutes={setEndMinutes}
      />
    </div>
  )
}

export default HourRangeSelector;