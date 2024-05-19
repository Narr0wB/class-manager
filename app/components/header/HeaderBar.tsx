import { checkIfAdmin } from "@/lib/backend/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import Title from "./Title";
import Menu from "./Menu";

const HeaderBar: React.FC = async () => {
  const session = await getServerSession();
  const admin = await checkIfAdmin(session?.user?.email!);

  return (
    session &&
    <header className="sticky top-0 w-screen h-20 flex justify-between items-center px-4 z-10 bg-secondary shadow-md">
      <div className="w-fit h-full flex flex-row gap-4 items-center select-none">
        <Link href="https://liceocuneo.it/" target="_blank" rel="noopener noreferrer" className="z-10">
          <Image src="/Logo-Liceo-Cuneo.png" alt="Logo liceo" width={100} height={50} />
        </Link>
        <Title />
      </div>
      <Menu admin={admin} />
    </header>
  )
}

export default HeaderBar;