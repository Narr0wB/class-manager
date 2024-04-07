"use client"

import { cn } from '@/lib/utils';
import ThemeButton from '../../theme-button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import ProfileButton from './profile-button';
import CreditsButton from '../../credits-button';

type NavProps = {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  const session = useSession();

  return (
    <nav id="nav-bar" className={cn(className, "flex flex-row space-x-2 items-center h-full w-fit p-2 rounded-secondary")}>
      {session.status === "loading" ? <Skeleton className="w-10 h-10 rounded-full" /> : <ProfileButton />}
      <ThemeButton className="aspect-square p-2" />
      <CreditsButton className="aspect-square p-2" />
    </nav>
  )
}

export default Nav;