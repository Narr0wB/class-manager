import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./Columns"
import { DataTable } from "./DataTable"
import { taskSchema } from "./data/Schema"
import { useEffect, useState } from "react"
import { useData } from "./TaskProvider"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

type TasksProps = {
    children?: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>

// Simulate a database read for tasks.
async function getTasks(date: Date) {
  const res = await fetch(`/api/database/prenotazione/SELECTRIEPILOGO?date=${date}`, { method: "GET" }); 
  const prenotazioni = await res.json();

  return z.array(taskSchema).parse(prenotazioni)
}

const Tasks: React.FC<TasksProps> = (props) => {
  const [prenotazioni, setPrenotazioni] = useState<any[]>([]);
  const [data, _]                       = useData();

  useEffect(() => {
    getTasks(data).then(data => { setPrenotazioni(data) } );
  }, [data])

 return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Riepilogo</h2>
            <p className="text-muted-foreground">
              {data.toLocaleString("it-IT").slice(0, 9)} 
            </p>
          </div>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        <DataTable data={prenotazioni} columns={columns} />
      </div>
    </>
  )
}

export default Tasks;
