"use client"

import { cn } from '@/lib/utils';
import ThemeButton from './theme-button';
import RepoButton from './repo-button';
import ProfileButton from './profile-button';

type NavProps = {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  return (
    <nav id="nav-bar" className={cn(className, "flex flex-row space-x-2 items-center h-full w-fit p-2 rounded-secondary")}>
      <ProfileButton className="aspect-square p-1" />
      <ThemeButton className="aspect-square p-1" />
      <RepoButton className="aspect-square p-1" />
    </nav>
  )
}

export default Nav;