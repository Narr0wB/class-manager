"use client"

import { useTimeframe } from '@/app/(routes)/(pages)/home/components/HomeProvider';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Prenotazione } from '@/lib/backend/database';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useSheet } from '../SheetProvider';
import { formatDate, formatHour } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DeleteIcon, Edit2Icon, Edit3Icon, EditIcon, TrashIcon } from 'lucide-react';

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
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-4">Le mie prenotazioni</SheetTitle>
        </SheetHeader>
        {prenotazioni &&
          <ul>
            {
              prenotazioni.map((prenotazione, i) => {
                // Do not remove this
                const data = new Date(prenotazione.data);
                return (
                  // TODO Make sheet wider
                  <li key={i} className="rounded-secondary p-2 flex flex-row w-max">
                    <div>
                      <span>Data: {formatDate(data)}</span><br />
                      <span> Dalle ore {prenotazione.ora_inizio} Alle ore: {prenotazione.ora_fine}</span>
                    </div>
                    <Button>
                      <TrashIcon />
                    </Button>
                    <Button>
                      <Edit3Icon />
                    </Button>
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