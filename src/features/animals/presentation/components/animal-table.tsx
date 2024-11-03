"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Animal, StatusAnimal } from "../../interfaces/animal.interface";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { statusOptions } from "../../constants/status-options";
import RHFInput from "@/components/rhf/RHFInput";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AnimalColumns } from "../components/table-columns";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FormFieldsAnimalFilter } from "../../hooks/use-animal-filter";
import RHFSelect from "@/components/rhf/RHFSelect";
import { sexOptions } from "../../constants/sex-options";

interface AnimalTableProps {
  animals: Animal[];
  idFarm?: number;
  methods: UseFormReturn<FormFieldsAnimalFilter>;
}

const AnimalTable = ({ animals, idFarm, methods }: AnimalTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const columns: ColumnDef<Animal>[] = AnimalColumns(idFarm);
  const table = useReactTable({
    data: animals || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Acciones en lote
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkStatusChange = (newStatus: StatusAnimal) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedRows = table.getSelectedRowModel().rows;
    // Implementar lógica para cambiar estado de múltiples animales
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkLotChange = (newLotId: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedRows = table.getSelectedRowModel().rows;
    // Implementar lógica para cambiar lote de múltiples animales
  };

  const handleBulkDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedRows = table.getSelectedRowModel().rows;
    // Implementar lógica para eliminar múltiples animales
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Animales</h1>
          <p className="text-sm text-muted-foreground">
            Lista de todos los animales
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          href={`/management/farm/${idFarm}/animal/create`}
        >
          Nuevo animal
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <FormProvider {...methods}>
            <RHFInput name="filter" label="Filtro" />
            <RHFSelect
              name="status"
              label="Estado"
              placeholder="Todos"
              options={[{ value: "all", label: "Todos" }, ...statusOptions]}
            />
            <RHFSelect
              name="sex"
              label="Sexo"
              placeholder="Todos"
              options={[{ value: "all", label: "Todos" }, ...sexOptions]}
            />
          </FormProvider>
        </div>

        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center space-x-2">
            <Select onValueChange={handleBulkStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cambiar estado" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="destructive" onClick={handleBulkDelete}>
              Eliminar seleccionados
            </Button>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                  No hay animales para mostrar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} animales seleccionados.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimalTable;
