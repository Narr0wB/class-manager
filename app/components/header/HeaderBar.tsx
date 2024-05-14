import { checkIfAdmin } from "@/lib/backend/auth";
import Nav from "./Nav";
import { getServerSession } from "next-auth";

const HeaderBar: React.FC = async () => {
  const session = await getServerSession();
  const admin = await checkIfAdmin(session?.user?.email!);

  return (
    <header className="sticky top-0 w-screen h-20 p-2 box-border z-10 bg-secondary shadow-md">
      <div className="size-full relative flex items-center justify-start">
        <Nav admin={admin} className="z-10" />
        <div className="absolute flex flex-row justify-center items-center gap-4 ml-40 right-0 left-0 m-auto select-none sm:ml-0 sm:md:lg:xl:2xl">
          {/* <img src={"door.svg"} alt="Logo" className="size-[50px]" />
          <h1 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary-foreground lg:xl:2xl">
            Class manager
          </h1> */}
        </div>
      </div>
    </header>
  )
}

export default HeaderBar;