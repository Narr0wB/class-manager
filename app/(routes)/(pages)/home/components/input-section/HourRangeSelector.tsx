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

  const maxDurataPrenotazione = config.max.ore_durata_prenotazione * 60;
  const minDurataPrenotazione = config.min.ore_durata_prenotazione * 60;
  const minOra = config.min.ora_prenotazione * 60;
  const maxOra = config.max.ora_prenotazione * 60;

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

        if (isStartProblem) {
          setStartMinutes(endMinutes - minDurataPrenotazione)
        } else {
          setEndMinutes(startMinutes + minDurataPrenotazione);
        }
      }
    }
  }

  function checkBounds() {
    let startHours = Math.floor(startMinutes / 60);
    let startMin = startMinutes % 60;
    let endHours = Math.floor(endMinutes / 60);
    let endMin = endMinutes % 60;

    if ((startMin % 10) != 0) {
      startMin -= startMin % 10;
      setStartMinutes(startHours * 60 + startMin);
    }
    else if ((endMin % 10) != 0) {
      endMin -= endMin % 10;
      setEndMinutes(endHours * 60 + endMin);
    }

    if (startHours < minOra / 60) {
      setStartMinutes(minOra);
    }
    if (endHours >= maxOra / 60) {
      setEndMinutes(maxOra);
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