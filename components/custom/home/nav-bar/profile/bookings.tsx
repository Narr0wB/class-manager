import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { forwardRef } from 'react';

type BookingsProps = {
  children: React.ReactNode;
  className?: string;
}

const Bookings = forwardRef<HTMLButtonElement, BookingsProps>(({ children, className }, ref) => {
  return (
    <Sheet>
      <SheetTrigger ref={ref}>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Le mie prenotazioni</SheetTitle>
        </SheetHeader>
        <div>
          <ul>
            <li>Prenotazione 1</li>
            <li>Prenotazione 2</li>
            <li>Prenotazione 3</li>
            <li>Prenotazione 4</li>
            <li>Prenotazione 5</li>
            <li>Prenotazione 6</li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
});

Bookings.displayName = 'Bookings'

export default Bookings;