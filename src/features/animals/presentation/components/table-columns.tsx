import { ColumnDef } from "@tanstack/react-table";
import {
  Animal,
  AnimalSex,
  Purpose,
  StatusAnimal,
} from "../../interfaces/animal.interface";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { animalSexSpanish } from "../../constants/animal-sex-spanish";
import { animalPurposeSpanish } from "../../constants/animal-purpose-spanish";
import { animalStatusSpanish } from "../../constants/animal-status-spanish";
import { useRouter } from "next/navigation";

export const AnimalColumns = (farmId?: number): ColumnDef<Animal>[] => {
  const router = useRouter();

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "number",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Número
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => row.getValue("description") || "-",
    },
    {
      accessorKey: "sex",
      header: "Sexo",
      cell: ({ row }) => (
        <Badge
          className={cn([
            "text-xs",
            animalSexSpanish[row.getValue("sex") as AnimalSex]?.class,
          ])}
        >
          {animalSexSpanish[row.getValue("sex") as AnimalSex]?.label}
        </Badge>
      ),
    },
    {
      accessorKey: "purpose",
      header: "Propósito",
      cell: ({ row }) => (
        <Badge
          className={cn([
            "text-xs",
            animalPurposeSpanish[row.getValue("purpose") as Purpose]?.class,
          ])}
        >
          {animalPurposeSpanish[row.getValue("purpose") as Purpose]?.label}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <Badge
          className={cn([
            "text-xs",
            animalStatusSpanish[row.getValue("status") as StatusAnimal]?.class,
          ])}
        >
          {animalStatusSpanish[row.getValue("status") as StatusAnimal]?.label}
        </Badge>
      ),
    },
    {
      accessorKey: "dateOfBirth",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de Nacimiento
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.getValue("dateOfBirth") as Date;
        return date ? format(new Date(date), "dd/MM/yyyy") : "-";
      },
    },
    {
      accessorKey: "dateOfPurchase",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de Compra
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.getValue("dateOfPurchase") as Date;
        return date ? format(new Date(date), "dd/MM/yyyy") : "-";
      },
    },
    {
      accessorKey: "lot.name",
      header: "Lote",
    },
    {
      accessorKey: "mother.name",
      header: "Madre",
      cell: ({ row }) => row.original.mother?.name || "-",
    },
    {
      accessorKey: "father.name",
      header: "Padre",
      cell: ({ row }) => row.original.father?.name || "-",
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const animal = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/management/farm/${farmId}/animal/edit/${animal.id}`
                  )
                }
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
