"use client"

import { signIn, useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Title from '@/app/components/header/Title';
import Image from 'next/image';

const Login: React.FC = () => {
  const session = useSession();

  if (session.data) redirect("home");

  return (
    <main className="w-full h-screen relative flex justify-center items-center lg:grid lg:grid-cols-2 overflow-hidden">
      <Image src="/Logo-Liceo-Cuneo.png" alt="Logo liceo" width={100} height={50} className="absolute top-5 right-5 m-auto" />
      <div
        className="h-screen bg-cover bg-center hidden justify-center items-center lg:flex"
        style={{ backgroundImage: "url('https://liceocuneo.it/wp-content/uploads/2022/09/Liceo-Pellico-Peano-Cuneo.jpg')" }}
      />
      <div className="size-full flex flex-col gap-10 justify-center items-center">
        <div className="space-y-4 text-3xl text-center">
          Liceo Classico e Scientifico<br />
          <Link href="https://liceocuneo.it/" target="_blank" className="text-primary text-4xl font-bold underline">
            Pellico-Peano
          </Link>
          <br />
        </div>
        <Card className="w-max border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-primary text-3xl">Class manager</CardTitle>
            <CardDescription>Utilizza l'account Google dell'Istituto</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => { signIn("google") }} className="size-full">
              Accedi
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Login;