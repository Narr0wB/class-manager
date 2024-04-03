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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Login: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  
  if (session.data) { router.replace("/home"); router.refresh(); };

  return (
    
    <div className="center bg-[#f5f2eb]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Entra con il tuo account Google dell'Istituto</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between align-center">
          <Button className="bg-purple-500" onClick={() => {signIn("google")}}>Login con Google</Button>
        </CardFooter>
      </Card>
    </div> 
  )
}

export default Login;