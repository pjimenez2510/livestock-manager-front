"use client";
import { useFarmForm } from "../../hooks/use-farm-form";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RHFSelect from "@/components/rhf/RHFSelect";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { Farm, Purpose } from "../../interfaces/farm.interface";

interface FarmFormProps {
  farm?: Farm;
}

export const FarmForm = ({ farm }: FarmFormProps) => {
  const { methods, onSubmit, isSubmiting } = useFarmForm({ farm });

  const purposeOptions = [
    { value: Purpose.Meat, label: "Carne" },
    { value: Purpose.Milk, label: "Leche" },
    { value: Purpose.DualPurpose, label: "Doble propósito" },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap- w-full3"
      >
        <RHFInput name="name" label="Nombre de la finca" />
        <RHFInput name="address" label="Dirección" />
        <RHFInput name="dimension" label="Dimension" />
        <RHFSelect name="purpose" label="Propósito" options={purposeOptions} />
        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? <LoadingSpinner /> : "Guardar"}
        </Button>
      </form>
    </FormProvider>
  );
};
