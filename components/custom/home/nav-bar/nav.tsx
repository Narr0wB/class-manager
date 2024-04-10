"use client"

import ThemeButton from './theme-button';
import RepoButton from './repo-button';
import ProfileButton from './profile-button';

const Nav: React.FC = () => {
  return (
    <nav id="nav-bar" className="w-fit h-[90%] flex flex-row space-x-2 items-center p-2">
      <ProfileButton className="aspect-square p-1" />
      <ThemeButton className="aspect-square p-1" />
      <RepoButton className="aspect-square p-1" />
    </nav>
  )
}

export default Nav;