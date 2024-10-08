"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import ThemeDropdown from '@/app/components/header/ThemeDropdown';
import { Moon, Sun } from 'lucide-react';

const Manutenzione: React.FC = () => {
  return (
    <main className="w-full h-screen relative flex justify-center items-center lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="absolute top-0 right-0 m-auto flex flex-row items-center justify-center gap-2 p-2">
        <ThemeDropdown>
          <Button variant="ghost" className="size-fit p-2">
            <Sun className="size-5 block dark:hidden" />
            <Moon className="size-5 hidden dark:block" />
          </Button>
        </ThemeDropdown>
        <Image src="/Logo-Liceo-Cuneo.png" alt="Logo liceo" width={100} height={50} />
      </div>
      <div
        className="h-screen bg-cover bg-center hidden justify-center items-center lg:flex"
        style={{ backgroundImage: "url('https://liceocuneo.it/wp-content/uploads/2022/09/Liceo-Pellico-Peano-Cuneo.jpg')" }}
      />
      <div className="size-full flex flex-col gap-10 justify-start items-center pt-20">
        <div className="space-y-4 text-3xl text-center">
          Liceo Classico e Scientifico<br />
          <Link href="https://liceocuneo.it/" target="_blank" className="text-primary text-4xl font-bold underline">
            Pellico-Peano
          </Link>
          <br />
        </div>
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-primary text-3xl">In manutenzione!</CardTitle>
          </CardHeader>
          <CardContent className="w-full text-lg text-center space-y-3">
            <span>
              {"Il sito è al momento in manutenzione. Riprova più tardi."}
            </span>
            <div>
              {"Se necessario contattaci scrivendo un'email all'indirizzo "}
              <span className="text-primary text-center">infostudenti@liceocuneo.it</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Manutenzione;