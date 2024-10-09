"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { statuses } from "./data/Data"
import { Task } from "./data/Schema"
import { DataTableColumnHeader } from "./DataTableHeader"
import { cn } from "@/lib/utils"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id"
  },
  {
    accessorKey: "aula",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aula" />
    ),
    cell: ({ row }) => <div className="w-[80px]"><Badge variant="outline">{row.getValue("aula")}</Badge></div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "prenotante",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prenotante" />
    ),
    cell: ({ row }) => {
      const label = String(row.original.label)

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("prenotante")}
          </span>
          {label && <Badge variant="default">{label}</Badge>}
        </div>
      )
    },
  },
  {
    accessorKey: "orario",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Orario" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("orario")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[150px] items-center">
          {
            status.icon &&
            <status.icon
              className={cn(
                "mr-2 h-4 w-4",
                status.label === "Approvata" ?
                  "text-green-500" :
                  (status.label === "In Approvazione")
                    ? "text-yellow-500"
                    : "text-red-500"
              )}
            />
          }
          <span>{status.label}</span>
        </div>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue(id)))
    },
  }
]
