"use client"

import { useEndMinutes, useStartMinutes } from '@/components/custom/home/left-panel/hour-provider';
import HourRangeDrawer from '@/components/custom/home/left-panel/date-time/hour-range/hour-range-drawer';
import LeftPanel from '@/components/custom/home/left-panel/left-panel';
import Floor from '@/components/custom/home/right-panel/floors/floor';
import FloorSelect from '@/components/custom/home/right-panel/user-selection/floor-select';
import { minutesToHourString } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';
import RigthPanel from '@/components/custom/home/right-panel/right-panel';
import { FLOORS } from '@/components/custom/home/right-panel/floor-provider';
import DatePicker from '@/components/custom/home/left-panel/date-time/date-picker';
import { TimeFrame } from '@/lib/backend/database';
import Nav from '@/components/custom/home/nav-bar/nav';

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
    <main className="h-[100vh] w-[100vw] max-h-screen max-w-screen overflow-hidden grid grid-rows-[10%_88%] p-4 gap-[2%]">
      <Nav />
      <div id="content" className="grid grid-cols-[29%_69%] gap-[2%]">
        <LeftPanel className="w-full h-full grid grid-rows-[35%_63%] gap-[2%]">
          <section id="bookings" className="w-full h-full rounded-secondary p-2">

          </section>
          <section id="date-time" className="w-full h-full grid grid-rows-[10%_90%] rounded-secondary p-2">
            <div id="hour-range" className="w-full h-full flex justify-center">
              <div id="hour-range-text" className="flex justify-center items-center text-4xl transition-all">
                <p className="pl-1">{minutesToHourString(startMinutes)}</p>
                <p className="px-2">-</p>
                <p className="pr-1">{minutesToHourString(endMinutes)}</p>
              </div>
              <HourRangeDrawer id="hour-range-drawer" className="flex items-center ml-2" />
            </div>
            <DatePicker timeFrameRef={time_frame} className="w-full h-full flex justify-center" />
          </section>
        </LeftPanel>
        <RigthPanel className="w-full h-full rounded-secondary flex flex-col p-4">
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