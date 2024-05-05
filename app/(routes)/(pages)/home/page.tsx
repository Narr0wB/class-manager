import { useSession } from 'next-auth/react';
import HomeClient from './components/HomeClient';
import HomeProvider from './components/HomeProvider';
import HomeClientAdmin from './components/HomeClientAdmin'
import { Roboto } from "next/font/google";
import { checkIfAdmin } from '@/lib/backend/auth';
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth';
import HomeWrapper from './components/HomeWrapper';


const Home: React.FC = async () => {
  const session = await getServerSession();
  const admin = await checkIfAdmin(session?.user?.email!);

  return (
    <HomeWrapper>
      {admin ? <HomeClientAdmin/> : <HomeClient />}
    </HomeWrapper>
  )
}

export default Home;