"use client"

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import HourRangeDrawer from './input-section/HourRangeDrawer';
import DatePicker from './input-section/DatePicker';
import FloorSelect from './map-section/FloorSelect';
import FloorsContainer from './map-section/FloorsContainer';
import Floor from './map-section/Floor';
import { useTimeframe } from './HomeProvider';
import { useState } from 'react';
import UsersCombobox from './input-section/UsersCombobox';
import UsersList from './input-section/UsersList';
import HourRangeText from './input-section/HourRangeText';
import Bookings from '@/app/components/header/bookings';
import UsersContainer from './input-section/UsersContainer';

export const FLOORS = {
  FLOOR_1: 1,
  FLOOR_2: 2,
  FLOOR_3: 3,
}

const HomeClient: React.FC = () => {
  const session = useSession();
  if (!session.data) redirect("/login");

  const [timeframe, _] = useTimeframe();
  const [floor, setFloor] = useState(FLOORS.FLOOR_1);

  return (
    <div id="content" className="w-screen h-fit lg:h-[calc(100vh-5rem)] box-border flex flex-col lg:flex-row gap-4 p-2 lg:xl:2xl">
      <aside id="input-panel" className="max-w-full lg:max-w-min lg:h-full panel flex-col justify-between md:grid md:grid-cols-2 lg:flex lg:flex-col gap-8 lg:xl:2xl">
        <section id="users-section" className="grow overflow-hidden flex flex-col gap-2">
          <UsersContainer>
            <UsersCombobox />
            <UsersList className="overflow-y-auto" />
          </UsersContainer>
        </section>
        <section id="datetime-section" className="flex-none h-fit min-h-fit flex flex-col gap-4">
          <div id="hour-range" className="flex flex-row justify-center items-center gap-4">
            <HourRangeText
              start={timeframe.inizio}
              end={timeframe.fine}
              className="text-3xl lg:text-4xl lg:xl:2xl"
            />
            <HourRangeDrawer />
          </div>
          <DatePicker />
        </section>
      </aside>
      <main id="map-panel" className="grow panel flex-col">
        {/* TODO: Fix map view problems */}
        <FloorSelect items={["Primo piano", "Secondo piano", "Terzo piano"]} setFloor={setFloor} className="w-fit h-10" />
        <FloorsContainer floor={floor} className="w-full h-[calc(100%-1rem-2.5rem)]">
          <Floor id={FLOORS.FLOOR_1} />
          <Floor id={FLOORS.FLOOR_2} />
          <Floor id={FLOORS.FLOOR_3} />
        </FloorsContainer>
      </main>
      <Bookings />
    </div>
  )
}

HomeClient.displayName = "HomeClient";

export default HomeClient;