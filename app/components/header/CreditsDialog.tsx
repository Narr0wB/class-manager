import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

type CreditsDialogProps = {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const CreditsDialog: React.FC<CreditsDialogProps> = ({ open }) => {
  const [isOpen, setIsOpen] = open;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl flex justify-between">
            Crediti
            <span className="ml-2 text-transparent text-[10px]">Free young thug</span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="space-y-5 text-secondary-foreground">
          <div className="space-y-2">
            <p className="text-primary text-lg">Developers</p>
            <ul className="flex flex-row space-x-4">
              <li>
                <Badge>
                  Marchisio Luca
                </Badge>
              </li>
              <li>
                <Badge>
                  Ilias El Fourati
                </Badge>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-primary text-lg">Supreme Leader and CEO</p>
            <Badge>Mirko Biagioli</Badge>
          </div>
          {/* <div>
            <p className="text-primary text-lg">Link alla repository</p>
            <Link href="https://github.com/Narr0wB/class-manager" target="_blank" className="underline mx-2">class-manager.git</Link>
          </div> */}
          <div className="space-y-2">
            <p className="text-primary text-lg">Dependencies</p>
            <Link href="https://nextjs.org/" target="_blank" className="underline">Next.js</Link>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Chiudi</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

CreditsDialog.displayName = "CreditsDialog";

export default CreditsDialog;
