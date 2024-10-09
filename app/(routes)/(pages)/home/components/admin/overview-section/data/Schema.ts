import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  aula: z.number(),
  prenotante: z.string(),
  orario: z.string(),
  status: z.number(),
  label: z.string(),
})

export type Task = z.infer<typeof taskSchema>
