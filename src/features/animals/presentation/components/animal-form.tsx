"use client";
import { memo, useMemo } from "react";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useAnimalForm } from "../../hooks/use-animal-form";
import {
  Animal,
  AnimalSex,
  Purpose,
  StatusAnimal,
} from "../../interfaces/animal.interface";
import RHFSelect from "@/components/rhf/RHFSelect";
import RHFDatePicker from "@/components/rhf/date-picker/RHFDatePicker";
import { useLotsQuery } from "@/features/lots/hooks/use-lot-query";
import { useFarmStore } from "@/features/farms/context/use-farm-store";
import RHFCombobox from "@/components/rhf/combobox/RHFCombobox";
import { useBreedsQuery } from "@/features/breeds/hooks/use-breed-query";
import { useAnimalsQuery } from "../../hooks/use-animal-query";

interface FormProps {
  animal?: Animal;
}

// Memoized options arrays to prevent recreating on every render
const purposeOptions = [
  { value: Purpose.Milk, label: "Leche" },
  { value: Purpose.Meat, label: "Carne" },
  { value: Purpose.DualPurpose, label: "Doble Propósito" },
];

const statusOptions = [
  { value: StatusAnimal.ALIVE, label: "Vivo" },
  { value: StatusAnimal.SOLD, label: "Vendido" },
  { value: StatusAnimal.LOST, label: "Perdido" },
  { value: StatusAnimal.DECEASED, label: "Muerto" },
];

const sexOptions = [
  { value: AnimalSex.MALE, label: "Macho" },
  { value: AnimalSex.FEMALE, label: "Hembra" },
];

interface FormFieldsProps {
  lotsOptions: { value: string; label: string }[];
  breedsOptions: { value: string; label: string }[];
  animalsMonOptions: { value: string; label: string }[];
  animalsFatherOptions: { value: string; label: string }[];
  isSubmiting: boolean;
}

// Separate component for form fields to prevent unnecessary rerenders
const FormFields = memo(
  ({
    lotsOptions,
    breedsOptions,
    animalsMonOptions,
    animalsFatherOptions,
    isSubmiting,
  }: FormFieldsProps) => (
    <>
      <RHFInput name="name" label="Nombre" />
      <RHFInput name="number" label="Número" />
      <RHFSelect name="sex" label="Sexo" options={sexOptions} />
      <RHFDatePicker name="dateOfBirth" label="Fecha de nacimiento" />
      <RHFDatePicker name="dateOfPurchase" label="Fecha de compra" />
      <RHFInput name="description" label="Descripción" />
      <RHFSelect name="purpose" label="Propósito" options={purposeOptions} />
      <RHFSelect name="status" label="Estado" options={statusOptions} />
      <RHFCombobox
        name="lotId"
        label="Lote"
        options={lotsOptions}
        placeholder="Selecciona un lote"
      />
      <RHFCombobox
        name="breedId"
        label="Raza"
        options={breedsOptions}
        placeholder="Selecciona una raza"
      />
      <RHFCombobox
        name="motherId"
        label="Madre"
        options={animalsMonOptions}
        placeholder="Selecciona una madre"
      />
      <RHFCombobox
        name="fatherId"
        label="Padre"
        options={animalsFatherOptions}
        placeholder="Selecciona un padre"
      />
      <Button disabled={isSubmiting} type="submit">
        {isSubmiting ? <LoadingSpinner /> : "Guardar"}
      </Button>
    </>
  )
);

FormFields.displayName = "FormFields";

export const AnimalForm = memo(({ animal }: FormProps) => {
  const { methods, onSubmit, isSubmiting } = useAnimalForm({ animal });
  const { farm } = useFarmStore();

  // Queries with proper dependencies
  const { data: lots, isLoading: isLoadingLots } = useLotsQuery({
    farmId: farm?.id,
  });
  const { data: breeds, isLoading: isLoadingBreeds } = useBreedsQuery();
  const { data: animalsMom, isLoading: isLoadingMom } = useAnimalsQuery({
    sex: AnimalSex.FEMALE,
  });
  const { data: animalsFather, isLoading: isLoadingFather } = useAnimalsQuery({
    sex: AnimalSex.MALE,
  });

  // Memoize options transformations
  const lotsOptions = useMemo(
    () =>
      lots?.map((lot) => ({
        value: String(lot.id),
        label: lot.name,
      })) ?? [],
    [lots]
  );

  const breedsOptions = useMemo(
    () =>
      breeds?.map((breed) => ({
        value: String(breed.id),
        label: breed.name,
      })) ?? [],
    [breeds]
  );

  const animalsMonOptions = useMemo(
    () =>
      animalsMom?.map((animal) => ({
        value: String(animal.id),
        label: animal.name,
      })) ?? [],
    [animalsMom]
  );

  const animalsFatherOptions = useMemo(
    () =>
      animalsFather?.map((animal) => ({
        value: String(animal.id),
        label: animal.name,
      })) ?? [],
    [animalsFather]
  );

  if (isLoadingLots || isLoadingBreeds || isLoadingMom || isLoadingFather) {
    return <LoadingSpinner />;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-xl"
      >
        <FormFields
          lotsOptions={lotsOptions}
          breedsOptions={breedsOptions}
          animalsMonOptions={animalsMonOptions}
          animalsFatherOptions={animalsFatherOptions}
          isSubmiting={isSubmiting}
        />
      </form>
    </FormProvider>
  );
});

AnimalForm.displayName = "AnimalForm";
