"use client"

import { useTimeframe } from '@/app/(routes)/(pages)/home/components/HomeProvider';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Prenotazione, Utente } from '@/lib/backend/database';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import Booking from './Booking';
import { useSheet } from '../LayoutProvider';
import Loading from '../Loading';

type BookingsProps = {
}

const Bookings: React.FC<BookingsProps> = () => {
  const [timeframe, _] = useTimeframe();
  const session = useSession();
  const [prenotazioni, setPrenotazioni] = useState<Prenotazione[] | null>(null);
  const [sheetOpen, setSheetOpen] = useSheet();

  const fetchPrenotazioni = useCallback(async () => {
    const res = await fetch(
      `/api/database/prenotazione/SELECT?userEmail=${session.data?.user?.email}&date=${new Date(new Date().getTime() + Math.abs(new Date().getTimezoneOffset() * 60000))}`,
      { method: "GET" }
    );

    const prenotazioni = await res.json();

    return prenotazioni;
  }, [timeframe.data, session.data?.user?.email, sheetOpen]);

  useEffect(() => {
    if (!sheetOpen) return;
    fetchPrenotazioni().then(prenotazioni => setPrenotazioni(prenotazioni));
  }, [sheetOpen]);

  return (
    // Do not give a key based on the "sheetOpen" state, because this will cause a re-render
    // while the sheet is closing, causing the animation to work improperly
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent side="left" className="w-60 md:w-72 lg:w-[500px] lg:max-w-[500px] overflow-y-auto">
        <SheetHeader className="space-y-1 mb-4">
          <SheetTitle className="text-center text-lg md:text-2xl mb-4 md:lg:xl">Le mie prenotazioni</SheetTitle>
        </SheetHeader>
        {
          prenotazioni && prenotazioni.length == 0
            ? <div className="w-full text-center">Nessuna prenotazione</div>
            : prenotazioni
              ? <ul className="w-full flex overflow-auto flex-col lg:grid lg:grid-cols-2 gap-3 items-center lg:xl:2xl">
                {
                  prenotazioni.map((prenotazione, i) => {
                    return (
                      <li key={prenotazione.id} className="size-full flex flex-row justify-center">
                        <Booking
                          prenotazione={prenotazione}
                          n={i}
                        />
                      </li>
                    )
                  })
                }
              </ul>
              : <Loading />
        }
      </SheetContent>
    </Sheet>
  );
}

Bookings.displayName = "Bookings";

export default Bookings;