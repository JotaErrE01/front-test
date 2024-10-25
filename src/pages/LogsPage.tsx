import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetch } from "@/hooks/useFetch";
import Spinner from "@/components/ui/spinner";
import { ILogsInterface, TokenStatus } from "@/interface/ILogsInterface";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const columns: ColumnDef<ILogsInterface>[] = [
  {
    accessorKey: "id",
    header: "ID de usuario",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "token",
    header: "Token",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: (info) => {
      if (info.getValue() === TokenStatus.available) {
        return <span className="text-green-500">Validado</span>
      } else if (info.getValue() === TokenStatus.expired) {
        return <span className="text-red-500">Expirado</span>
      } else {
        return <span className="text-yellow-500">Usado</span>
      }
    },
  },
  {
    accessorKey: "expirationDate",
    header: "Fecha de expiración",
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return <span>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return <span>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
    },
  },
];


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("")
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, _, filterValue): any => {
      return table
        .getAllColumns()
        .some((column: any) => {
          const cellValue: string | number = row.getValue(column.id);
          if (
            cellValue == TokenStatus.available ||
            cellValue == TokenStatus.used ||
            cellValue == TokenStatus.expired
          ) {
            const toCompare = cellValue === TokenStatus.available ? 'Validado' : cellValue === TokenStatus.used ? 'Usado' : 'Expirado';
            return String(toCompare)
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          }

          if (typeof cellValue === 'string' && cellValue.includes(':') && cellValue.includes('T') && cellValue.includes('Z')) {
            const date = new Date((cellValue as any));
            const newCellValue = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

            return newCellValue.includes(filterValue.toLowerCase()) || String(cellValue)
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          }

          return String(cellValue)
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        })
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <div className="flex-col flex gap-8">
      <div className="flex flex-col gap-2">
        <p>Filtro General:</p>
        <Input
          placeholder="Buscar"
          value={globalFilter}
          className="max-w-sm"
          onChange={({ target }) => {
            setGlobalFilter(target.value ?? "");
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>

  )
}


export const LogsPage = () => {
  const { data, isLoading } = useFetch<ILogsInterface[]>('/users/logs');

  return (
    <div className="container mx-auto py-10">
      {
        isLoading ? (
          <Spinner size="lg" />
        ) : (
          <DataTable columns={columns} data={data!} />
        )
      }
    </div>
  )
};
