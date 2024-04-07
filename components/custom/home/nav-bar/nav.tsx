import { cn } from '@/lib/utils';
import ThemeButton from '../../theme-button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import ProfileButton from './profile-button';

type NavProps = {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  const session = useSession();

  return (
    <nav id="nav-bar" className={cn(className, "w-full")}>
      <div id="user" className="flex flex-row items-center h-full w-32 md:w-40 lg:w-64 rounded-secondary">
        {
          session.status === "authenticated" ? (
            <>
              <ProfileButton
                profileName={session.data.user?.name!}
                image={session.data.user?.image!}
                className="ml-2" />
              <ThemeButton className="ml-4 aspect-square p-2" />
            </>
          ) : (
            <Skeleton className="w-full h-full rounded-full" />
          )
        }
      </div>
    </nav>
  )
}

export default Nav;