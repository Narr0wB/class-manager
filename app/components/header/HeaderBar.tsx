import { checkIfAdmin } from "@/lib/backend/auth";
import Nav from "./Nav";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";

const HeaderBar: React.FC = async () => {
  const session = await getServerSession();
  const admin = await checkIfAdmin(session?.user?.email!);

  return (
    <header className="sticky top-0 w-screen h-20 p-2 box-border z-10 bg-secondary shadow-md">
      {/* TODO: Fix header layout on smaller screens */}
      <div className="size-full relative flex items-center justify-between">
        <Nav admin={admin} className="z-10" />
        <div className="absolute flex flex-row justify-center items-center gap-4 right-0 left-0 m-auto select-none">
          <Image src="/door.svg" alt="Logo class manager" width={50} height={50} />
          <div className="flex flex-col">
            <h1 className="text-primary text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
              Class manager
            </h1>
            <h2 className="text-sm">Sistema di prenotazione delle classi</h2>
          </div>
        </div>
        <Link href="https://liceocuneo.it/" target="_blank" rel="noopener noreferrer" className="z-10">
          <Image src="/Logo-Liceo-Cuneo.png" alt="Logo liceo" width={100} height={50} />
        </Link>
      </div>
    </header>
  )
}

export default HeaderBar;