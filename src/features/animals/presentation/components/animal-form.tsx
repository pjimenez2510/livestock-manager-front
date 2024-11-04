"use client";
import { memo, useMemo } from "react";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useAnimalForm } from "../../hooks/use-animal-form";
import { Animal, AnimalSex } from "../../interfaces/animal.interface";
import RHFSelect from "@/components/rhf/RHFSelect";
import RHFDatePicker from "@/components/rhf/date-picker/RHFDatePicker";
import { useLotsQuery } from "@/features/lots/hooks/use-lot-query";
import { useFarmStore } from "@/features/farms/context/use-farm-store";
import RHFCombobox from "@/components/rhf/combobox/RHFCombobox";
import { useBreedsQuery } from "@/features/breeds/hooks/use-breed-query";
import { useAnimalsQuery } from "../../hooks/use-animal-query";
import { purposeOptions } from "../../constants/purpose-options";
import { sexOptions } from "../../constants/sex-options";
import { statusOptions } from "../../constants/status-options";
import { useRouter } from "next/navigation";
import ImageUpload from "./image-upload";

interface FormProps {
  animal?: Animal;
}

interface FormFieldsProps {
  lotsOptions: { value: string; label: string }[];
  breedsOptions: { value: string; label: string }[];
  animalsMonOptions: { value: string; label: string }[];
  animalsFatherOptions: { value: string; label: string }[];
  isSubmiting: boolean;
  urlImg?: string;
}

const FormFields = memo(
  ({
    lotsOptions,
    breedsOptions,
    animalsMonOptions,
    animalsFatherOptions,
    isSubmiting,
    urlImg,
  }: FormFieldsProps) => (
    <>
      <ImageUpload urlImg={urlImg} />
      <RHFInput name="number" label="Número" />
      <RHFInput name="name" label="Nombre" />
      <RHFInput name="description" label="Descripción" />
      <RHFSelect name="sex" label="Sexo" options={sexOptions} />
      <RHFDatePicker name="dateOfBirth" label="Fecha de nacimiento" />
      <RHFDatePicker name="dateOfPurchase" label="Fecha de compra" />
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
  const router = useRouter();
  const { methods, onSubmit, isSubmiting } = useAnimalForm({ animal });
  const { farm } = useFarmStore();

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
    return (
      <div className="flex flex-row justify-center gap-4">
        <LoadingSpinner /> Cargando datos...
      </div>
    );
  }

  if (!lots || lots.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xl">Antes de crear un animal debes crear un lote</p>
        <div className="flex justify-center w-full">
          <Button
            onClick={() => {
              router.push(`/management/farm/${farm?.id}/lot/create`);
            }}
            variant="secondary"
          >
            Crear lote
          </Button>
        </div>
      </div>
    );
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
          urlImg={animal?.urlImg}
        />
      </form>
    </FormProvider>
  );
});

AnimalForm.displayName = "AnimalForm";
