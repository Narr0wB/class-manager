import ThemeButton from './ThemeButton';
import RepoButton from './RepoButton';
import ProfileButton from './ProfileButton';
import { getServerSession } from 'next-auth';
import { selectPrenotazioniUser } from '@/lib/backend/database';

const Nav: React.FC = async () => {
  const session = await getServerSession();
  const res = await selectPrenotazioniUser(session?.user?.email!, null);

  return (
    <nav id="nav-bar" className="w-fit h-[90%] flex flex-row space-x-2 items-center p-2">
      <ProfileButton
        prenotazioni={(
          <ul>
            {res && res.map(prenotazione => {
              return (
                <li key={prenotazione.id}>
                  {`Data: ${prenotazione.data}, approvata: ${prenotazione.approvata}`}
                </li>
              )
            })}
          </ul>
        )}
        className="aspect-square p-1"
      />
      <ThemeButton className="aspect-square p-1" />
      <RepoButton className="aspect-square p-1" />
    </nav>
  )
}

export default Nav;