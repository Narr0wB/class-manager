import HourProvider from './input-section/hour-provider';
import FloorProvider from './map-section/floor-provider';

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