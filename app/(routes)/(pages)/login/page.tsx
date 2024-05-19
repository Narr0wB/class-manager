"use client"

import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from "next/navigation";

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
    // Just like in HomeClient (full screen height - header height)
    <main className="w-full h-[calc(100vh-5rem)] flex justify-center items-center lg:grid lg:grid-cols-2">
      <div className="lg:col-start-2 size-full flex justify-center items-center">
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