"use client"

import { useTimeframe } from '@/app/(routes)/(pages)/home/components/HomeProvider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Prenotazione } from '@/lib/backend/database';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useSheet } from '../SheetProvider';

type BookingsProps = {
}

const Bookings: React.FC<BookingsProps> = () => {
  const [timeframe, setTimeframe] = useTimeframe();
  const session = useSession();
  const [prenotazioni, setPrenotazioni] = useState<Prenotazione[] | null>(null);
  const [sheetOpen, setSheetOpen] = useSheet();

  const fetchPrenotazioni = useCallback(async () => {
    const res = await fetch(
      `/api/database/prenotazione/SELECT?userEmail=${session.data?.user?.email}&date=${null}`,
      { method: "GET" }
    );
    const prenotazioni = await res.json();
    return prenotazioni;
  }, [timeframe.data, session.data?.user?.email]);

  useEffect(() => {
    fetchPrenotazioni().then(prenotazioni => {
      setPrenotazioni(prenotazioni);
      console.log(prenotazioni);
    });
  }, [sheetOpen]);

  return (
    <Sheet open={sheetOpen} onOpenChange={() => setSheetOpen(prev => !prev)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-4">Le mie prenotazioni</SheetTitle>
        </SheetHeader>
        {prenotazioni &&
          <ul>
            {
              prenotazioni.map(prenotazione => {
                return (
                  <li>
                    <span>Data: {`${prenotazione.data}`}</span>
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