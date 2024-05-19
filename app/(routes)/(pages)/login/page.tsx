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
    <main className="absolute w-screen h-screen flex justify-center items-center">
      <Card className="w-max">
        <CardHeader>
          <CardTitle>Accedi</CardTitle>
          <CardDescription>Utilizza l'account Google dell'Istituto</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => { signIn("google") }}>Accedi</Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default Login;