"use client";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useVaccineForm } from "../../hooks/use-vaccine-form";
import { IntervalType, Vaccine } from "../../interfaces/vaccine.interface";
import RHFSelect from "@/components/rhf/RHFSelect";

interface FormProps {
  vaccine?: Vaccine;
}

export const VaccineForm = ({ vaccine }: FormProps) => {
  const { methods, onSubmit, isSubmiting } = useVaccineForm({ vaccine });

  const optionsTimeTypes = [
    { value: IntervalType.Day, label: "Día/s" },
    { value: IntervalType.Month, label: "Mes/es" },
    { value: IntervalType.Year, label: "Año/s" },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-xl"
      >
        <RHFInput name="name" label="Nombre de la vacuna" />
        <RHFInput name="description" label="Descripción" />
        <div className="flex w-full gap-2">
          <RHFInput name="intervalDays" label="Intervalo de vacunación" />
          <RHFSelect
            name="intervalType"
            label="Tipo de intervalo"
            options={optionsTimeTypes}
          />
        </div>
        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? <LoadingSpinner /> : "Guardar"}
        </Button>
      </form>
    </FormProvider>
  );
};
