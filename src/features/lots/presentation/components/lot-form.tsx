"use client";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RHFSelect from "@/components/rhf/RHFSelect";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { Lot, Purpose } from "../../interfaces/lots.interface";
import { useLotForm } from "../../hooks/use-lot-form";
import { useFarmsQuery } from "@/features/farms/hooks/use-farm-query";

interface LotFormProps {
  lot?: Lot;
}

export const LotForm = ({ lot }: LotFormProps) => {
  const isEditing = !!lot;
  const { methods, onSubmit, isSubmiting } = useLotForm({ lot });
  const { data: farms } = useFarmsQuery();

  const purposeOptions = [
    { value: Purpose.Meat, label: "Carne" },
    { value: Purpose.Milk, label: "Leche" },
    { value: Purpose.DualPurpose, label: "Doble propósito" },
  ];

  const farmOptions = farms?.map((farm) => ({
    value: String(farm.id),
    label: farm.name,
  }));

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-xl"
      >
        <RHFInput name="name" label="Nombre del lote" />
        <RHFInput
          name="dimension"
          label="Dimension en hectareas"
          type="number"
        />
        <RHFSelect name="purpose" label="Propósito" options={purposeOptions} />
        {isEditing && (
          <RHFSelect
            name="farmId"
            label="Cambiar de finca"
            options={farmOptions || []}
          />
        )}

        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? <LoadingSpinner /> : "Guardar"}
        </Button>
      </form>
    </FormProvider>
  );
};
