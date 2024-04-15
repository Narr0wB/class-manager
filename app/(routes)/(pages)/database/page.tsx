"use client"

import { Button } from "@/components/ui/button";
import { Prenotazione } from "@/lib/backend/database";

const Database: React.FC = () => {
  const prenotazione: Prenotazione = {
    id: 0,
    id_utente: 0,
    id_aula: 0,
    data: new Date(Date.now()),
    approvata: false
  }

  return (

    <main className="w-full h-full flex items-center justify-center gap-2">
      <Button onClick={async () => {
        const res = await fetch("/api/database/prenotazione/INSERT", {
          method: "POST",
          body: JSON.stringify(prenotazione)
        });

        const data = await res.json();

        console.log(data);
      }}>
        INSERT PRENOTAZIONE
      </Button>
      <Button>
        SELECT
      </Button>
      <Button>
        UPDATE
      </Button>
    </main>
  )
}

Database.displayName = "Database"

export default Database;