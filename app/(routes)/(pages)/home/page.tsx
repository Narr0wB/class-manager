"use client"

import HomeClient from './components/HomeClient';
import HomeProvider from './components/HomeProvider';


const Home: React.FC = () => {
  return (
    <HomeProvider>
      <HomeClient />
    </HomeProvider>
  )
}

export default Home;