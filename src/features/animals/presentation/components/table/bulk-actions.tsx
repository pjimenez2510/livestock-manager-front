import { Table } from "@tanstack/react-table";
import { Animal, StatusAnimal } from "../../../interfaces/animal.interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions } from "../../../constants/status-options";
import ComboboxOptions from "@/components/rhf/combobox/ComboboxOptions";
import { getLotsOptions } from "@/features/lots/utils/get-lots-options";
import { Lot } from "@/features/lots/interfaces/lots.interface";

interface BulkActionsProps {
  table: Table<Animal>;
  lots: Lot[];
  onStatusChange: (status: StatusAnimal) => void;
  onLotChange: (lotId: number) => void;
}

export const BulkActions = ({
  table,
  onStatusChange,
  onLotChange,
  lots,
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

      <ComboboxOptions
        options={getLotsOptions(lots)}
        value=""
        onChange={(value) => {
          onLotChange(+value);
        }}
        placeholder="Cambiar lote"
      />
    </div>
  );
};
