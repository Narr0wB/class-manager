"use client"

import { minutesToHourString } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';
import HourProvider, { useEndMinutes, useStartMinutes } from './input-section/HourProvider';
import HourRangeDrawer from './input-section/HourRangeDrawer';
import DatePicker from './input-section/DatePicker';
import FloorProvider, { FLOORS } from './map-section/FloorProvider';
import FloorSelect from './map-section/FloorSelect';
import FloorsContainer from './map-section/FloorsContainer';
import Floor from './map-section/Floor';
import { useTimeframe } from './HomeProvider';
import { Button } from '@/components/ui/button';
import Prova from './Prova';

const HomeClient: React.FC = () => {
  const session = useSession();
  if (!session.data) redirect("/login");

  const [timeframe, setTimeframe] = useTimeframe();

  return (
    <main className="w-screen h-fit lg:h-[calc(100vh-5rem)] box-border p-2 lg:xl:2xl">
      <Prova></Prova>
      <div id="content" className="w-full h-full box-border grid grid-rows-[27rem_30rem] gap-4 lg:grid-cols-[30%_69%] lg:grid-rows-1 lg:gap-[1%] lg:xl:2xl">
        <section id="input-section" className="w-full h-full rounded-secondary flex flex-col justify-evenly gap-4">
          <div id="hour-range" className="flex justify-center items-center">
            <div id="hour-range-text" className="flex justify-center items-center text-3xl lg:text-4xl lg:xl:2xl">
              <p className="pl-1">{minutesToHourString(timeframe.inizio)}</p>
              <p className="px-2">-</p>
              <p className="pr-1">{minutesToHourString(timeframe.fine)}</p>
            </div>
            <HourProvider>
              <HourRangeDrawer className="ml-4" />
            </HourProvider>
          </div>
          <DatePicker className="flex justify-center items-center" />
        </section>
        <section id="map-section" className="w-full h-full box-border flex flex-col p-2 gap-4 rounded-secondary">
          <FloorSelect className="w-fit h-10" items={["Piano terra", "Primo piano", "Secondo piano"]} />
          <FloorProvider>
            <FloorsContainer className="w-full h-[calc(100%-1rem-2.5rem)]">
              <Floor id={FLOORS.FLOOR_0} />
              <Floor id={FLOORS.FLOOR_1} />
              <Floor id={FLOORS.FLOOR_2} />
            </FloorsContainer>
          </FloorProvider>
        </section>
      </div>
    </main>
  )
}

HomeClient.displayName = "HomeClient";

export default HomeClient;