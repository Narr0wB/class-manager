import HourProvider from './input-section/HourProvider';
import FloorProvider from './map-section/FloorProvider';

type HomeProviderProps = {
  children?: React.ReactNode;
}

const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  return (
    <HourProvider>
      <FloorProvider>
        {children}
      </FloorProvider>
    </HourProvider>
  )
}

export default HomeProvider;