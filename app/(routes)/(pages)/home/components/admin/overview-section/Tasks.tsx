import { z } from "zod"

import { columns } from "./Columns"
import { DataTable } from "./DataTable"
import { taskSchema } from "./data/Schema"
import { useEffect, useState } from "react"
import { useData } from "./TaskProvider"

type TasksProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>

// Simulate a database read for tasks.
async function getTasks(date: Date) {
  const res = await fetch(`/api/database/prenotazione/SELECTRIEPILOGO?date=${date}`, { method: "GET" });
  const prenotazioni = await res.json();

  const arr = z.array(taskSchema).parse(prenotazioni);
  return arr
}

const Tasks: React.FC<TasksProps> = (props) => {
  const [prenotazioni, setPrenotazioni] = useState<any[]>([]);
  const [data, _] = useData();

  useEffect(() => {
    getTasks(data).then(tasks => { setPrenotazioni(tasks) });
  }, [data])

  return (
    <div id="tasks" className="h-full flex flex-col gap-4 p-4">
      <div id="riepilogo-title" className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Riepilogo</h2>
        <p className="text-muted-foreground">
          {data.toLocaleString("it-IT").slice(0, 10)}
        </p>
      </div>
      <DataTable data={prenotazioni} columns={columns} />
    </div>
  )
}

export default Tasks;
