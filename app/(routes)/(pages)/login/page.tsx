"use client"

import GoogleButton from "react-google-button";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // Use router navigation instead of redirect for caching issues
  if (session.data) { router.replace("/home"); router.refresh(); };

  return (
    <main className="absolute w-screen h-screen flex justify-center items-center">
      <Card className="w-max">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Entra con il tuo account Google dell'Istituto</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-purple-500" onClick={() => { signIn("google") }}>Login con Google</Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default Login;