import Nav from '../home/nav-bar/nav';

const HeaderBar: React.FC = () => {
  return (
    <header className="sticky top-0 w-full h-full flex items-center p-2 box-border z-10 bg-secondary shadow-md">
      <Nav />
    </header>
  )
}

export default HeaderBar;