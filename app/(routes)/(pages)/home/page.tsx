import HomeClient from './components/HomeClient';
import HomeClientAdmin from './components/HomeClientAdmin'
import { checkIfAdmin } from '@/lib/backend/auth';
import { getServerSession } from 'next-auth';
import HomeWrapper from './components/HomeWrapper';
import { redirect } from 'next/navigation';
import { isInManutenzione } from '@/lib/backend/manutenzione';

const Home: React.FC = async () => {
  const session = await getServerSession();
  const admin = await checkIfAdmin(session?.user?.email!);

  // if (isInManutenzione()) redirect("/manutenzione");
  // else if (!session) redirect("/login");

  return (
    <HomeWrapper>
      {admin ? <HomeClientAdmin /> : <HomeClient />}
    </HomeWrapper>
  )
}

export default Home;
