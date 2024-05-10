"use client"

import { useTimeframe } from '@/app/(routes)/(pages)/home/components/HomeProvider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Prenotazione } from '@/lib/backend/database';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { formatDate, } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Edit3Icon, TrashIcon } from 'lucide-react';
import Booking from './Booking';
import { useSheet } from '../LayoutProvider';

type BookingsProps = {
}

const Bookings: React.FC<BookingsProps> = () => {
  const [timeframe, setTimeframe] = useTimeframe();
  const session = useSession();
  const [prenotazioni, setPrenotazioni] = useState<Prenotazione[] | null>(null);
  const [sheetOpen, setSheetOpen] = useSheet();

  const fetchPrenotazioni = useCallback(async () => {
    const res = await fetch(
      `/api/database/prenotazione/SELECT?userEmail=${session.data?.user?.email}`,
      { method: "GET" }
    );
    const prenotazioni = await res.json();
    return prenotazioni;
  }, [timeframe.data, session.data?.user?.email]);

  useEffect(() => {
    fetchPrenotazioni().then(prenotazioni => {
      setPrenotazioni(prenotazioni);
    });
  }, []);

  return (
    <Sheet key={Number(sheetOpen)} open={sheetOpen} onOpenChange={setSheetOpen}>
      {/* TODO Fix mobile view */}
      <SheetContent className="w-[400px] sm:w-md sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-1 mb-4">
          <SheetTitle>Le mie prenotazioni</SheetTitle>
          <SheetDescription>Tasto destro per modificare o eliminare</SheetDescription>
        </SheetHeader>
        {prenotazioni &&
          <ul className="w-full flex flex-col gap-3 items-center">
            {
              prenotazioni.map((prenotazione, i) => {
                return (
                  <li key={i} className="flex flex-row w-full">
                    <Booking prenotazione={prenotazione} n={i} />
                  </li>
                )
              })
            }
          </ul>
        }
      </SheetContent>
    </Sheet>
  );
}

Bookings.displayName = "Bookings";

export default Bookings;