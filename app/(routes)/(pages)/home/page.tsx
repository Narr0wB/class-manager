import HomeClient from './components/HomeClient';
import HomeClientAdmin from './components/HomeClientAdmin'
import { checkIfAdmin } from '@/lib/backend/auth';
import { getServerSession } from 'next-auth';
import HomeWrapper from './components/HomeWrapper';

const Home: React.FC = async () => {
  const session = await getServerSession();
  const admin = await checkIfAdmin(session?.user?.email!);

  return (
    <HomeWrapper>
      {true ? <HomeClientAdmin /> : <HomeClient />}
    </HomeWrapper>
  )
}

export default Home;