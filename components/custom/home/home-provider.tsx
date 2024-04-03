import HourProvider from './left-panel/hour-provider';
import FloorProvider from './right-panel/floor-provider';

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