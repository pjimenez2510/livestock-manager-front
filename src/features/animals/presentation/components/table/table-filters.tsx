import { FormProvider, UseFormReturn } from "react-hook-form";
import RHFInput from "@/components/rhf/RHFInput";
import RHFSelect from "@/components/rhf/RHFSelect";
import RHFCombobox from "@/components/rhf/combobox/RHFCombobox";
import { statusOptions } from "../../../constants/status-options";
import { sexOptions } from "../../../constants/sex-options";
import { Lot } from "@/features/lots/interfaces/lots.interface";
import { getLotsOptions } from "@/features/lots/utils/get-lots-options";
import { FormFieldsAnimalFilter } from "../../../hooks/use-animal-filter";

interface TableFiltersProps {
  methods: UseFormReturn<FormFieldsAnimalFilter>;
  lots: Lot[];
}

export const TableFilters = ({ methods, lots }: TableFiltersProps) => {
  return (
    <div className="flex w-full items-center gap-2">
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
        <RHFCombobox
          name="lotId"
          label="Lote"
          placeholder="Todos"
          options={[{ value: "", label: "Todos" }, ...getLotsOptions(lots)]}
        />
      </FormProvider>
    </div>
  );
};
