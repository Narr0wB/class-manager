import DatePicker from '@/components/custom/date-picker';
import HourDrawer from '@/components/custom/hour-drawer';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';

type HomeProps = {
}

const Home: React.FC<HomeProps> = ({ }) => {
  return (
    <main className="h-[100vh] w-[100vw] max-h-screen max-w-screen">
      <nav className="w-screen h-[10%]">
        <div id="user" className="flex flex-row h-full w-[20%] border-solid border-2 border-black">
          <Button>
            Tema
          </Button>
          <Avatar>
            Profilo
          </Avatar>
        </div>
      </nav>
      <div id="left-bar" className="w-[25%] h-full p-2 flex flex-col gap-2 border-solid border-2 border-black">
        <div id="bookings" className="w-full aspect-square border-solid border-2 border-black"></div>
        <div id="date-time" className="w-full h-full flex flex-col border-solid border-2 border-black">
          <div id="hour-selector" className="grid justify-between w-full aspect-[3] grid-cols-[5fr_2fr] border-solid border-2 border-black">
            <div id="hour" className="flex justify-items-center items-center border-solid border-2 border-black">
              12.36
            </div>
            <div id="hour-drawer" className="border-solid border-2 border-black">
              <HourDrawer />
            </div>
          </div>
          <div id="date-picker" className="border-solid border-2 border-black">
            <DatePicker />
          </div>
        </div>
      </div>
      <div id="map" className="border-solid border-2 border-black"></div>
    </main>
  );
}

export default Home;