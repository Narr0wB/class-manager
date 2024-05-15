"use client"

import { minutesToHourString } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import HourRangeDrawer from './input-section/HourRangeDrawer';
import DatePicker from './input-section/DatePicker';
import FloorSelect from './map-section/FloorSelect';
import FloorsContainer from './map-section/FloorsContainer';
import Floor from './map-section/Floor';
import { usePartecipazioni, useTimeframe } from './HomeProvider';
import { useState } from 'react';
import Bookings from '@/app/components/header/bookings';
import { Badge } from '@/components/ui/badge';
import UsersCombobox from './input-section/UsersCombobox';

export const FLOORS = {
  FLOOR_1: 1,
  FLOOR_2: 2,
  FLOOR_3: 3,
}

const HomeClient: React.FC = () => {
  const session = useSession();
  if (!session.data) redirect("/login");

  const [timeframe, setTimeframe] = useTimeframe();
  const [partecipazioni, setPartecipazioni] = usePartecipazioni();
  const [floor, setFloor] = useState(FLOORS.FLOOR_1);

  return (
    <main className="w-screen h-fit lg:h-[calc(100vh-5rem)] box-border p-2 lg:xl:2xl">
      <div id="content" className="size-full box-border grid grid-rows-[27rem_30rem] gap-4 lg:grid-cols-[30%_69%] lg:grid-rows-1 lg:gap-[1%] lg:xl:2xl">
        <section id="input-section" className="size-full rounded-secondary grid grid-cols-2 grid-rows-1 lg:grid-cols-1 lg:grid-rows-[max\_content_max\_content_min\_content_max\_content] gap-2 p-2">
          <div id="hour-range" className="h-max h-min-max flex items-center">
            <div id="hour-range-text" className="flex justify-center items-center text-3xl lg:text-4xl lg:xl:2xl">
              <p className="pl-1">{minutesToHourString(timeframe.inizio)}</p>
              <span className="px-2">-</span>
              <p className="pr-1">{minutesToHourString(timeframe.fine)}</p>
            </div>
            <HourRangeDrawer className="ml-4" />
          </div>
          <UsersCombobox />
          <ul className="overflow-auto flex lg:flex-row gap-2">
            <li>
              <Badge>
                Prova
              </Badge>
            </li>
            <li>
              <Badge>
                Prova
              </Badge>
            </li>
          </ul>
          <DatePicker />
        </section>
        <section id="map-section" className="size-full box-border flex flex-col p-2 gap-4 rounded-secondary">
          <FloorSelect items={["Primo piano", "Secondo piano", "Terzo piano"]} setFloor={setFloor} className="w-fit h-10" />
          <FloorsContainer floor={floor} className="w-full h-[calc(100%-1rem-2.5rem)]">
            <Floor id={FLOORS.FLOOR_1} />
            <Floor id={FLOORS.FLOOR_2} />
            <Floor id={FLOORS.FLOOR_3} />
          </FloorsContainer>
        </section>
        {/* DON'T REMOVE*/}
        <Bookings />
      </div>
    </main>
  )
}

HomeClient.displayName = "HomeClient";

export default HomeClient;