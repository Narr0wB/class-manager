"use client"

import DatePicker from '@/components/custom/date-picker';
import { useEndMinutes, useStartMinutes } from '@/components/custom/home/bookings-input/hour-range/hour-provider';
import HourRangeDrawer from '@/components/custom/home/bookings-input/hour-range/hour-range-drawer';
import ThemeButton from '@/components/custom/theme-button';
import { Avatar } from '@/components/ui/avatar';
import { minutesToHourString } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const session = useSession();
  if (!session.data) redirect("/login");

  const [startMinutes, setStartMinutes] = useStartMinutes();
  const [endMinutes, setEndMinutes] = useEndMinutes();

  function inStartBound(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;

    if (hours < 13) {
      return 13 * 60;
    }
    if ((min % 10) != 0) {
      min -= min % 10;
      return hours * 60 + min;
    }

    return 0;
  }

  function inEndBound(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;

    if ((min % 10) != 0) {
      min -= min % 10;
    }
    if ((minutes - startMinutes) < 60) {
      hours = Math.floor(startMinutes / 60) + 1;
      min = startMinutes % 60;

      return hours * 60 + min;
    } else if (hours > 18) {
      return 18 * 60;
    }

    return 0;
  }

  function fit(minutes: number) {
    var hours = Math.floor(minutes / 60);
    var min = minutes % 60 - minutes % 10;

    if (hours < 13) {
      hours = 13
    }

    if ((minutes - startMinutes) < 60) {
      hours = Math.floor(startMinutes / 60) + 1;
      min = startMinutes % 60;
    }

    return hours * 60 + min;
  }

  useEffect(() => {
    setStartMinutes(fit(startMinutes));
  }, [startMinutes]);

  useEffect(() => {
    setEndMinutes(fit(endMinutes));
  }, [endMinutes]);

  return (
    <main className="h-[100vh] w-[100vw] max-h-screen max-w-screen overflow-hidden grid grid-rows-[10%_89%] p-2">
      <nav className="w-full">
        <div id="user" className="flex flex-row h-full w-[20%] border-solid border-[1px] border-black">
          <ThemeButton />
          <Avatar>
            Profilo
          </Avatar>
        </div>
      </nav>
      <div id="content" className="grid grid-cols-[1fr_9fr] pt-2 gap-4">
        <div id="left-bar" className="grid grid-rows-[2fr_7fr] border-solid border-[1px] border-black">
          <div id="bookings" className="w-full border-solid"></div>
          <div id="date-time" className="w-full ">
            <div id="hour-range" className="grid justify-between w-full aspect-[3] grid-cols-[5fr_2fr] border-solid border-[0px] border-black">
              <div id="hour-range-text" className="flex justify-center items-center font-bold text-purple-600 xl:text-6xl md:text-3xl transition-all">
                <p className="pl-1">{minutesToHourString(startMinutes)}</p>
                <p className="text-black px-2">-</p>
                <p className="pr-1">{minutesToHourString(endMinutes)}</p>
              </div>
              <HourRangeDrawer
                id="hour-range-drawer"
                className=" border-[1px] border-black" />
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