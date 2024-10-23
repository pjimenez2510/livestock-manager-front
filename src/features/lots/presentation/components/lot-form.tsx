"use client";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RHFSelect from "@/components/rhf/RHFSelect";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { Lot, Purpose } from "../../interfaces/lots.interface";
import { useLotForm } from "../../hooks/use-lot-form";

interface LotFormProps {
  lot?: Lot;
}

export const LotForm = ({ lot }: LotFormProps) => {
  const { methods, onSubmit, isSubmiting } = useLotForm({ lot });

  const purposeOptions = [
    { value: Purpose.Meat, label: "Carne" },
    { value: Purpose.Milk, label: "Leche" },
    { value: Purpose.DualPurpose, label: "Doble propósito" },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-xl"
      >
        <RHFInput name="name" label="Nombre del lote" />
        <RHFInput name="dimension" label="Dimension en hectareas" />
        <RHFSelect name="purpose" label="Propósito" options={purposeOptions} />
        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? <LoadingSpinner /> : "Guardar"}
        </Button>
      </form>
    </FormProvider>
  );
};
