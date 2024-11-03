import { ColumnDef } from "@tanstack/react-table";
import { Animal, StatusAnimal } from "./animal.interface";

export interface AnimalTableProps {
  data: Animal[];
  columns: ColumnDef<Animal>[];
  onStatusChange: (status: StatusAnimal) => void;
  onDelete: () => void;
}
