"use client"

import DatePicker from '@/components/custom/date-picker';
import HourDrawer from '@/components/custom/home/bookings-input/hour-select-drawer/hour-drawer';
import ThemeButton from '@/components/custom/theme-button';
import { Avatar } from '@/components/ui/avatar';
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
        <div id="user" className="flex flex-row h-full w-[20%] border-solid border-[1px] border-black">
          <ThemeButton />
          <Avatar>
            Profilo
          </Avatar>
        </div>
      </nav>
      <div id="content" className="grid grid-cols-[3fr_10fr] gap-4 py-2">
        <div id="left-bar" className="grid grid-rows-[2fr_7fr] border-solid border-[1px] border-black">
          <div id="bookings" className="w-full border-solid"></div>
          <div id="date-time" className="w-full ">
            <div id="hour-selector" className="grid justify-between w-full aspect-[3] grid-cols-[5fr_2fr] border-solid border-[0px] border-black">
              <div id="hours" className="flex justify-center items-center">
                <p ref={oraInizio} className="text-6xl font-bold text-purple-600 px-4"></p>
                <p className="text-4xl text-black">-</p>
                <p ref={oraFine} className="text-6xl font-bold text-purple-600 px-4"></p>
              </div>
              <HourDrawer id="hour-drawer" inizioTextRef={oraInizio} fineTextRef={oraFine} className=" border-[1px] border-black" />
            </div>
            <DatePicker id="date-picker" className="w-full" />
          </div>
        </div>
        <div id="map" className="border-solid border-[1px] border-black"></div>
      </div>
    </main>
  );
}

export default Home;