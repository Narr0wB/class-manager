import Nav from "./Nav";

const HeaderBar: React.FC = () => {
  return (
    <header className="sticky top-0 w-screen h-20 flex items-center p-2 box-border z-10 bg-secondary shadow-md">
      <Nav />
    </header>
  )
}

export default HeaderBar;