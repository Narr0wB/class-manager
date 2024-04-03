"use client"

import { useEndMinutes, useStartMinutes } from '@/components/custom/home/left-panel/hour-provider';
import HourRangeDrawer from '@/components/custom/home/left-panel/date-time/hour-range/hour-range-drawer';
import LeftPanel from '@/components/custom/home/left-panel/left-panel';
import Floor from '@/components/custom/home/right-panel/floors/floor';
import FloorSelect from '@/components/custom/home/right-panel/user-selection/floor-select';
import ThemeButton from '@/components/custom/theme-button';
import { minutesToHourString } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';
import RigthPanel from '@/components/custom/home/right-panel/right-panel';
import { FLOORS } from '@/components/custom/home/right-panel/floor-provider';
import DatePicker from '@/components/custom/home/bookings-input/date-picker/date-picker';
import { TimeFrame } from '@/lib/backend/database';
import ProfileDrawer from '@/components/custom/home/nav-bar/profile-drawer';

const Home: React.FC = () => {
  const session = useSession();
  if (!session.data) redirect("/login");

  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();

  const time_frame = useRef<TimeFrame>(null);

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
  }, [startMinutes, endMinutes]);

  return (
    <main className="h-[100vh] w-[100vw] max-h-screen max-w-screen overflow-hidden grid grid-rows-[10%_89%] p-2 bg-secondary">
      <nav className="w-full">
        <div id="user" className="flex flex-row h-full w-[20%] border-solid border-[1px] border-black">
          <ProfileDrawer profileName={session.data.user?.name!} image={session.data.user?.image!} />
          <ThemeButton />
        </div>
      </nav>
      <div id="content" className="grid grid-cols-[1fr_9fr] pt-2 gap-4">
        <LeftPanel id="left-panel" className="grid grid-rows-[2fr_7fr] border-solid border-[1px] border-black p-4">
          <section id="bookings" className="w-full border-solid"></section>
          <section id="date-time" className="w-full ">
            <div id="hour-range" className="grid justify-between w-full aspect-[3] grid-cols-[5fr_2fr] border-solid border-[0px] border-black">
              <div id="hour-range-text" className="flex justify-center items-center font-bold text-purple-600 xl:text-6xl md:text-3xl transition-all">
                <p className="pl-1">{minutesToHourString(startMinutes)}</p>
                <p className="text-black px-2">-</p>
                <p className="pr-1">{minutesToHourString(endMinutes)}</p>
              </div>
              <HourRangeDrawer id="hour-range-drawer" className=" border-[1px] border-black" />
            </div>
            <DatePicker id="date-picker" timeFrameRef={time_frame} className="w-full" />
          </section>
        </LeftPanel>
        <RigthPanel id="right-panel" className="border-solid border-[1px] border-black flex flex-col p-4">
          <section id="user-selection" className="w-[20%]">
            <FloorSelect items={["Piano terra", "Primo piano", "Secondo piano"]} />
          </section>
          <section id="floors" className="w-full h-full">
            <Floor num={FLOORS.FLOOR_0} className="bg-red-500" />
            <Floor num={FLOORS.FLOOR_1} className="bg-green-500" />
            <Floor num={FLOORS.FLOOR_2} className="bg-blue-500" />
          </section>
        </RigthPanel>
      </div>
    </main>
  );
}

export default Home;