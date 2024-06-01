"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <main className="absolute w-screen h-screen flex justify-center items-center">
      <Card className="w-max">
        <CardHeader>
          <CardTitle>404</CardTitle>
          <CardDescription>Pagina non trovata</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-purple-500 w-min">
            <Link href="/home">Torna alla home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default NotFound;