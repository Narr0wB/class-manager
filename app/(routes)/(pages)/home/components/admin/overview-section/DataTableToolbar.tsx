"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "./DataTableViewOptions"

import { statuses } from "./data/Data"
import { DataTableFacetedFilter } from "./DataTableFilter"
import { useData } from "./TaskProvider"
import DatePicker from "./DatePicker"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [data, setData] = useData();

  return (
    <div id="data-table-filters" className="flex items-center justify-between">
      <div className="flex flex-1 items-start gap-2 flex-col sm:flex-row sm:items-center">
        <DatePicker date={data} setDate={setData} />
        {
          table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )
        }
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
