"use client";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useBreedForm } from "../../hooks/use-breed-form";
import { Breed } from "../../interfaces/breed.interface";

interface FormProps {
  breed?: Breed;
}

export const BreedForm = ({ breed }: FormProps) => {
  const { methods, onSubmit, isSubmiting } = useBreedForm({ breed: breed });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-xl"
      >
        <RHFInput name="name" label="Nombre de la raza" />
        <RHFInput name="description" label="Descripción" />

        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? <LoadingSpinner /> : "Guardar"}
        </Button>
      </form>
    </FormProvider>
  );
};
