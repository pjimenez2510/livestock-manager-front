import { Table } from "@tanstack/react-table";
import { Animal, StatusAnimal } from "../../../interfaces/animal.interface";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions } from "../../../constants/status-options";

interface BulkActionsProps {
  table: Table<Animal>;
  onStatusChange: (status: StatusAnimal) => void;
  onDelete: () => void;
}

export const BulkActions = ({
  table,
  onStatusChange,
  onDelete,
}: BulkActionsProps) => {
  if (table.getSelectedRowModel().rows.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mt-4">
      <Select onValueChange={onStatusChange}>
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

      <Button variant="destructive" onClick={onDelete}>
        Eliminar seleccionados
      </Button>
    </div>
  );
};
