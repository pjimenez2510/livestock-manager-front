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
import queryClient from "@/core/infrastructure/react-query/query-client";
import { QUERY_KEYS } from "@/shared/api/query-key";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UpdateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  title: string;
  description: string;
}

const UpdateDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
}: UpdateDialogProps) => (
  <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

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
  const [updateDialog, setUpdateDialog] = useState<{
    isOpen: boolean;
    type: "status" | "lot" | null;
    data: { status?: StatusAnimal; lotId?: number };
  }>({
    isOpen: false,
    type: null,
    data: {},
  });

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

  const getSelectedIds = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    return selectedRows.map((row) => +row.original.id);
  };

  const handleUpdateConfirm = async () => {
    const ids = getSelectedIds();
    if (!ids.length) return;

    try {
      await AnimalService.getInstance().updateAnimals({
        animalsId: ids,
        data: updateDialog.data,
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ANIMALS] });
      setRowSelection({});
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateDialog((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleBulkStatusChange = (newStatus: StatusAnimal) => {
    setUpdateDialog({
      isOpen: true,
      type: "status",
      data: { status: newStatus },
    });
  };

  const handleBulkLotChange = (newLotId: number) => {
    setUpdateDialog({
      isOpen: true,
      type: "lot",
      data: { lotId: newLotId },
    });
  };

  const getDialogProps = () => {
    const baseProps = {
      isOpen: updateDialog.isOpen,
      onOpenChange: (open: boolean) =>
        setUpdateDialog((prev) => ({ ...prev, isOpen: open })),
      onConfirm: handleUpdateConfirm,
    };

    if (updateDialog.type === "status") {
      return {
        ...baseProps,
        title: "Actualizar Estado",
        description:
          "Estás seguro que deseas cambiar el estado de los animales seleccionados?",
      };
    }

    return {
      ...baseProps,
      title: "Actualizar Lote",
      description:
        "Estás seguro que deseas cambiar el lote de los animales seleccionados?",
    };
  };

  return (
    <div className="flex flex-col gap-4">
      <TableHeader idFarm={idFarm} />

      <div className="flex flex-col items-center justify-between">
        <TableFilters methods={methods} lots={lots} />

        <BulkActions
          lots={lots}
          table={table}
          onStatusChange={handleBulkStatusChange}
          onLotChange={handleBulkLotChange}
        />

        <ColumnVisibilityDropdown table={table} />
      </div>

      <DataTable table={table} columns={columns} />

      <TablePagination table={table} />

      <UpdateDialog {...getDialogProps()} />
    </div>
  );
};

export default AnimalTable;
