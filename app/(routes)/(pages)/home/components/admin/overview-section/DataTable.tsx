"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./DataTablePagination"
import { DataTableToolbar } from "./DataTableToolbar"
import { dash_rules, PRENOTAZIONE_APPROVED, PRENOTAZIONE_REJECTED, PRENOTAZIONE_PENDING, useAdminSelectedSection, usePrenotazione } from "@/lib/backend/admin"
import { useRuleset, useTrigger } from "../../HomeProvider"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const statuses = [
  "In arrivo",
  "Approvate",
  "Rifiutate"
]

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [_, setSelected] = useAdminSelectedSection();
  const [__, setTrigger] = useTrigger()
  const [___, setPrenotazione] = usePrenotazione()
  const [____, setRuleset] = useRuleset()
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div id="table-full" className="space-y-4 flex flex-col" >
      <DataTableToolbar table={table} />
      <Table className="grow rounded border overflow-y-scroll">
        <TableHeader>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })
                }
              </TableRow>
            ))
          }
        </TableHeader>
        <TableBody>
          {
            table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => {
                    const status = Number(row.getValue("status"));

                    if (status == PRENOTAZIONE_PENDING) {
                      setRuleset(prev => ({ ...prev, dashRule: dash_rules.in_arrivo }));
                      setSelected({ value: "In arrivo" });
                    }
                    else if (status == PRENOTAZIONE_APPROVED) {
                      setRuleset(prev => ({ ...prev, dashRule: dash_rules.approvate }));
                      setSelected({ value: "Approvate" });
                    }
                    else if (status == PRENOTAZIONE_REJECTED) {
                      setRuleset(prev => ({ ...prev, dashRule: dash_rules.rifiutate }));
                      setSelected({ value: "Rifiutate" });
                    }

                    setPrenotazione({ selected: Number(row.getValue("id")) })
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nessun risultato.
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      <div id="spacer" className="flex-1" />
      <DataTablePagination table={table} />
    </div>
  )
}
