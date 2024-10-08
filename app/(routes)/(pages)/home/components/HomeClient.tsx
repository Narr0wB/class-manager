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
import DateTimeInfo from './map-section/DateTimeInfo';
import { ChevronsUpDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

export const FLOORS = {
  FLOOR_1: 1,
  FLOOR_2: 2,
  FLOOR_3: 3,
}

const HomeClient: React.FC = () => {
  const [timeframe, _] = useTimeframe();
  const [floor, setFloor] = useState(FLOORS.FLOOR_2);

  return (
    // isDateInSchoolYear(getLocaleDate(timeframe.data))
    true
      ? <div id="content" className="w-screen overflow-hidden h-fit lg:h-[calc(100vh-5rem)] flex flex-col lg:flex-row gap-4">
        <aside id="input-panel" className="panel max-w-full lg:max-w-min lg:h-full overflow-y-auto flex flex-col justify-between md:grid md:grid-cols-2 lg:flex lg:flex-col gap-4">
          <section id="users-section" className="grow shrink-0 basis-1.5 min-h-40 flex flex-col gap-2 p-2">
            <UsersContainer>
              <UsersCombobox className="flex-none" />
              <UsersList className="flex-1 overflow-auto content-start rounded-secondary" />
            </UsersContainer>
          </section>
          <section id="datetime-section" className="grow shrink-0 basis-1 h-fit min-h-fit flex flex-col items-center justify-start gap-2 p-2">
            <HourRangeDrawer className="rounded-secondary self-start w-full sm:w-1/2 md:w-full flex justify-between px-4">
              <HourRangeText start={timeframe.inizio} end={timeframe.fine} className="text-3xl" />
              <ChevronsUpDown className="ml-5 size-6 shrink-0 opacity-50" />
            </HourRangeDrawer>
            <DatePicker className="w-full rounded-secondary p-2 px-4" />
          </section>
        </aside>
        <Separator orientation="vertical" className="hidden lg:block" />
        <Separator orientation="horizontal" className="block lg:hidden" />
        <main id="map-panel" className="panel grow flex-col">
          <div className="flex flex-row justify-between items-center">
            <FloorSelect items={["Primo piano", "Secondo piano", "Terzo piano"]} setFloor={setFloor} className="w-fit h-10" />
            <DateTimeInfo timeframe={timeframe} />
          </div>
          <FloorsContainer floor={floor} className="w-full h-[calc(100%-1rem-2.5rem)] min-h-fit overflow-auto p-4">
            <Floor id={FLOORS.FLOOR_1} />
            <Floor id={FLOORS.FLOOR_2} />
            <Floor id={FLOORS.FLOOR_3} />
          </FloorsContainer>
        </main>
        <Bookings />
      </div>
      : <div
        className="w-screen h-[calc(100vh-5rem)] bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('https://liceocuneo.it/wp-content/uploads/2022/09/Liceo-Pellico-Peano-Cuneo.jpg')" }}
      >
        <div className="bg-secondary text-2xl sm:text-3xl md:text-4xl text-primary p-4 rounded-md select-none whitespace-nowrap">
          {"Torna l'anno prossimo!"}
        </div>
      </div>
  )
}

HomeClient.displayName = "HomeClient";

export default HomeClient;
