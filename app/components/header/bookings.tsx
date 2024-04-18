import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { forwardRef } from 'react';

type BookingsProps = {
  children: React.ReactNode;
  prenotazioni: React.ReactNode;
}

const Bookings = forwardRef<HTMLButtonElement, BookingsProps>(({ children, prenotazioni }, ref) => {
  return (
    <Sheet>
      <SheetTrigger ref={ref} onClick={e => e.stopPropagation()}>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-4">Le mie prenotazioni</SheetTitle>
        </SheetHeader>
        {prenotazioni}
      </SheetContent>
    </Sheet>
  );
});

Bookings.displayName = 'Bookings'

export default Bookings;