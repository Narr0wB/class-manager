import { cn } from '@/lib/utils';
import Nav from '../home/nav-bar/nav';

type HeaderBarProps = {
  className?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ className }) => {
  return (
    <header className={cn(className, "")}>
      <Nav className="w-full h-16" />
    </header>
  )
}

export default HeaderBar;