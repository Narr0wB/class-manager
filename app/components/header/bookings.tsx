"use client"

import { useTimeframe } from '@/app/(routes)/(pages)/home/components/HomeProvider';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Prenotazione } from '@/lib/backend/database';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useSheet } from '../SheetProvider';
import { formatDate, } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Edit3Icon, TrashIcon } from 'lucide-react';
import Booking from './Booking';

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
    <Sheet key={Number(sheetOpen)} open={sheetOpen} onOpenChange={() => setSheetOpen(prev => !prev)}>
      <SheetContent className="sm:max-w-fit overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="mb-4">Le mie prenotazioni</SheetTitle>
        </SheetHeader>
        {prenotazioni &&
          <ul className="w-fit flex flex-col gap-3">
            {
              prenotazioni.map((prenotazione, i) => {
                return (
                  <li key={i} className="flex flex-row w-max">
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