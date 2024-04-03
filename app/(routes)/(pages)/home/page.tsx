"use client"

import HomeProvider from '@/components/custom/home/home-provider';
import Home from './home';

const Page: React.FC = () => {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  )
}

export default Page;