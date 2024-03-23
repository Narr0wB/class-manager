"use client"

import DatePicker from '@/components/custom/date-picker';
import HourDrawer from '@/components/custom/hour-drawer';
import ThemeButton from '@/components/custom/theme-button';
import { Avatar } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { RefObject, useRef } from 'react';

const Home: React.FC = () => {
  const session = useSession();
  if (!session.data) redirect("/login");

  const timeTextRef: RefObject<HTMLParagraphElement> = useRef(null);

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
        <div id="left-bar" className="p-2 grid grid-rows-[2fr_7fr] gap-2 border-solid border-[1px] border-black">
          <div id="date-time" className="w-full flex flex-col border-solid border-[1px] border-black">
            <div id="hour-selector" className="grid justify-between w-full aspect-[3] grid-cols-[5fr_2fr] border-solid border-[1px] border-black">
              <div id="hours" className="flex justify-center items-center border-solid border-[1px] border-black">
                <p ref={timeTextRef} className="text-2xl"></p>
              </div>
              <HourDrawer id="hour-drawer" timeTextRef={timeTextRef} className="border-solid border-[1px] border-black" />
            </div>
            <DatePicker id="date-picker" className="w-full border-solid border-[1px] border-black" />
          </div>
          <div id="bookings" className="w-full border-solid border-[1px] border-black"></div>
        </div>
        <div id="map" className="border-solid border-[1px] border-black"></div>
      </div>
    </main>
  );
}

export default Home;