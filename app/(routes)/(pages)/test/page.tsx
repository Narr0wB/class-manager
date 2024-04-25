"use client"

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


const Test: React.FC = () => {
    const session = useSession();
  
    if (!session.data) redirect("login");
  
    return (
      <main className="absolute w-screen h-screen flex justify-center items-center">
        <Button onClick={async () => {const res = await fetch("/api/map", {
            method: "POST",
            body: JSON.stringify({ message: 'Hello, world!' }),
        }); console.log(await res.json()) }}>
            test
        </Button>
      </main>
    )
}

export default Test;