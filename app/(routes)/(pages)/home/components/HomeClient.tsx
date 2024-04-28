"use client"

import { minutesToHourString } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { TimeFrame } from '@/lib/backend/database';
import { useEndMinutes, useStartMinutes } from './input-section/HourProvider';
import HourRangeDrawer from './input-section/HourRangeDrawer';
import DatePicker from './input-section/DatePicker';
import { FLOORS } from './map-section/FloorProvider';
import FloorSelect from './map-section/FloorSelect';
import FloorsContainer from './map-section/FloorsContainer';
import Floor from './map-section/Floor';
import { useTimeframe } from './HomeProvider';

const HomeClient: React.FC = () => {
  const session = useSession();
  if (!session.data) redirect("/login");

  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();

  const [timeframe, setTimeframe] = useTimeframe();

  function inStartBounds(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;

    if (hours < 13) {
      return 13 * 60;
    }
    if (hours >= 17) {
      return 17 * 60;
    }
    if ((min % 10) != 0) {
      min -= min % 10;
      return hours * 60 + min;
    }

    return 0;
  }

  function inEndBounds(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;

    if ((min % 10) != 0) {
      min -= min % 10;
      return hours * 60 + min;
    }
    if ((minutes - startMinutes) < 60) {
      hours = Math.floor(startMinutes / 60) + 1;
      min = startMinutes % 60;

      return hours * 60 + min;
    } else if (hours >= 18) {
      return 18 * 60;
    }

    return 0;
  }

  useEffect(() => {
    let b = inStartBounds(startMinutes);

    if (b != 0) {
      setStartMinutes(b);
    }

    b = inEndBounds(endMinutes);

    if (b != 0) {
      setEndMinutes(b);
    }

    setTimeframe(prevState => {
      prevState.fine = endMinutes;
      prevState.inizio = startMinutes;
      return prevState;
    })
  }, [startMinutes, endMinutes]);

  return (
    <main className="w-screen h-fit lg:h-[calc(100vh-5rem)] box-border p-2 lg:xl:2xl">
      <div id="content" className="w-full h-full box-border grid grid-rows-[27rem_30rem] gap-4 lg:grid-cols-[30%_69%] lg:grid-rows-1 lg:gap-[1%] lg:xl:2xl">
        <section id="input-section" className="w-full h-full rounded-secondary flex flex-col justify-evenly gap-4">
          <div id="hour-range" className="flex justify-center items-center">
            <div id="hour-range-text" className="flex justify-center items-center text-3xl lg:text-4xl lg:xl:2xl">
              <p className="pl-1">{minutesToHourString(startMinutes)}</p>
              <p className="px-2">-</p>
              <p className="pr-1">{minutesToHourString(endMinutes)}</p>
            </div>
            <HourRangeDrawer className="ml-4" />
          </div>
          <DatePicker className="flex justify-center items-center" />
        </section>
        <section id="map-section" className="w-full h-full box-border flex flex-col p-2 gap-4 rounded-secondary">
          <FloorSelect className="w-fit h-10" items={["Piano terra", "Primo piano", "Secondo piano"]} />
          <FloorsContainer className="w-full h-[calc(100%-1rem-2.5rem)]">
            <Floor id={FLOORS.FLOOR_0} />
            <Floor id={FLOORS.FLOOR_1} />
            <Floor id={FLOORS.FLOOR_2} />
          </FloorsContainer>
        </section>
      </div>
    </main>
  )
}

HomeClient.displayName = "HomeClient";

export default HomeClient;