"use client";

import { Animal, StatusAnimal } from "../../../interfaces/animal.interface";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FormFieldsAnimalFilter } from "../../../hooks/use-animal-filter";
import { Lot } from "@/features/lots/interfaces/lots.interface";
import { AnimalColumns } from "./table-columns";
import { UseFormReturn } from "react-hook-form";
import { TableFilters } from "./table-filters";
import { BulkActions } from "./bulk-actions";
import { TableHeader } from "./table-header";
import { ColumnVisibilityDropdown } from "./column-visibility-dropdown";
import { DataTable } from "./data-table";
import { TablePagination } from "./table-pagination";
import { AnimalService } from "@/features/animals/services/animal.service";

interface AnimalTableProps {
  animals: Animal[];
  lots: Lot[];
  idFarm?: number;
  methods: UseFormReturn<FormFieldsAnimalFilter>;
}

const AnimalTable = ({
  animals,
  idFarm,
  methods,
  lots = [],
}: AnimalTableProps) => {
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

  const handleBulkStatusChange = (newStatus: StatusAnimal) => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (newStatus) {
      const ids = selectedRows.map((row) => +row.original.id);
      if (!ids.length) return;
      AnimalService.getInstance().updateAnimals({
        ids,
        status: newStatus as StatusAnimal,
      });
    }
  };

  const handleBulkDelete = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    console.log(selectedRows);
  };

  return (
    <div className="flex flex-col gap-4">
      <TableHeader idFarm={idFarm} />

      <div className="flex flex-col items-center justify-between">
        <TableFilters methods={methods} lots={lots} />

        <BulkActions
          table={table}
          onStatusChange={handleBulkStatusChange}
          onDelete={handleBulkDelete}
        />

        <ColumnVisibilityDropdown table={table} />
      </div>

      <DataTable table={table} columns={columns} />

      <TablePagination table={table} />
    </div>
  );
};

export default AnimalTable;
