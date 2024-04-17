"use client"

import { Button } from "@/components/ui/button";
import { Prenotazione } from "@/lib/backend/database";

const Database: React.FC = () => {
  const prenotazione: Prenotazione = {
    id_utente: 1,
    id_aula: 2,
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
      <Button onClick={async () => {
        const res = await fetch("/api/database/utente/SELECT?email=eddu@liceocuneo.it", {
          method: "GET"
        });

        const data = await res.json();

        console.log(data);
      }}>
        SELECT UTENTE
      </Button>
      <Button>
        UPDATE
      </Button>
    </main>
  )
}

Database.displayName = "Database"

export default Database;