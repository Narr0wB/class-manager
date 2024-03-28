"use client"

import DatePicker from '@/components/custom/home/bookings-input/date-picker/date-picker';
import HourDrawer from '@/components/custom/home/bookings-input/hour-select-drawer/hour-drawer';
import ProfileDrawer from '@/components/custom/home/nav-bar/pfp-drawer';
import ThemeButton from '@/components/custom/theme-button';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { RefObject, useRef } from 'react';

const Home: React.FC = () => {
  const session = useSession();
  if (!session.data) redirect("/login");

  const oraInizio: RefObject<HTMLParagraphElement> = useRef(null);
  const oraFine: RefObject<HTMLParagraphElement> = useRef(null);

  return (
    <main className="h-[100vh] w-[100vw] max-h-screen max-w-screen overflow-hidden grid grid-rows-[10%_89%]">
      <nav className="w-screen">
        <div id="user" className="h-full w-[20%] border-solid grid grid-cols-[5%_15%_5%_10%] grid-rows-[10%_90%]">
          <ProfileDrawer profileName={session.data.user?.name!} image={session.data.user?.image!} className="row-start-2 col-start-2"></ProfileDrawer>
          <ThemeButton className="text-black border flex row-start-2 col-start-4"/>
        </div>
      </nav>
      <div id="content" className="grid grid-cols-[4fr_12fr] gap-4 py-2">
        <div id="left-bar" className="grid grid-rows-[2fr_7fr] border-solid ">
          <div id="bookings" className="w-full border-solid"></div>
          <div id="date-time" className="w-full grid-rows-[4fr_6fr]">
            <div id="hour-selector" className="grid justify-between w-full aspect-[3] grid-cols-[80%_20%] border-solid border-[0px] border-black">
              <div id="hours" className="grid grid-rows-[30%_30%_30%_10%] grid-cols-[4%_40%_10%_40%]">
                <p className="text-2xl font-sans-ui-sans-serif text-slate-800 row-start-2 col-start-2">Inizio: </p>
                <p ref={oraInizio} className="text-6xl font-bold text-slate-800 row-start-3 col-start-2"></p>
                <div className="row-start-1 row-end-5 col-start-2"></div>
                <p className="text-2xl font-sans-ui-sans-serif text-slate-800 row-start-2 col-start-4">Fine: </p>
                <p ref={oraFine} className="text-6xl font-bold text-slate-800 row-start-3 col-start-4"></p>
              </div>
              <HourDrawer id="hour-drawer" inizioTextRef={oraInizio} fineTextRef={oraFine} className="grid grid-rows-[1fr_1fr_1fr] grid-cols-[1fr_1fr]" />
            </div>
            <DatePicker id="date-picker" className="" />
          </div>
        </div>
        <div id="map" className="border-solid border-[1px] border-black"></div>
      </div>
    </main>
  );
}

export default Home;