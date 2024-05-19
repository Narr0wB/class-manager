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

const Login: React.FC = () => {
  const session = useSession();

  if (session.data) redirect("home");

  return (
    <main className="w-full h-screen flex justify-center items-center lg:grid lg:grid-cols-2">
      <div
        className="h-screen bg-cover bg-center hidden justify-center items-center lg:flex"
        style={{ backgroundImage: "url('https://liceocuneo.it/wp-content/uploads/2022/09/Liceo-Pellico-Peano-Cuneo.jpg')" }}
      />
      <div className="relative size-full flex flex-col justify-center items-center">
        <div className="absolute top-0 space-y-4 p-10 text-3xl">
          Liceo Classico e Scientifico Statale<br />
          <span className="text-4xl font-bold">Pellico-Peano</span><br />
          Cuneo<br />
          <Button variant="link" className="p-0" onClick={() => redirect("https://liceocuneo.it/")}>
            Visita il sito
          </Button>
        </div>
        <Card className="w-max border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle>Accedi</CardTitle>
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