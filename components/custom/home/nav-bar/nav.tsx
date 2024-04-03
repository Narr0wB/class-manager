import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import ThemeButton from '../../theme-button';
import { redirect } from 'next/navigation';
import ProfileDropdown from './profile-dropdown';

type NavProps = {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  const session = useSession();
  if (!session.data) redirect("/login");

  return (
    <nav className={cn(className, "w-full")}>
      <div id="user" className="flex flex-row h-full w-32 md:w-40 lg:w-64 transition-all rounded-secondary">
        <ProfileDropdown profileName={session.data.user?.name!} image={session.data.user?.image!} className="ml-2" />
        <ThemeButton className="ml-2" />
      </div>
    </nav>
  )
}

export default Nav;