"use client"

import ThemeButton from './ThemeButton';
import RepoButton from './RepoButton';
import ProfileButton from './ProfileButton';
import { cn } from '@/lib/utils';

type NavProps = {
  className?: string;
  admin: boolean;
}

const Nav: React.FC<NavProps> = ({ className, admin }) => {
  return (
    <nav id="nav-bar" className={cn("w-fit h-[90%] flex flex-row space-x-2 items-center p-2", className)}>
      <ProfileButton admin={admin} className="aspect-square p-1" />
      <ThemeButton className="aspect-square p-1" />
      {/* <RepoButton className="aspect-square p-1" /> */}
    </nav>
  )
}

export default Nav;