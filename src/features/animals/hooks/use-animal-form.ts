"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/shared/api/query-key";
import queryClient from "@/core/infrastructure/react-query/query-client";
import {
  Animal,
  AnimalSex,
  Purpose,
  StatusAnimal,
} from "../interfaces/animal.interface";
import { AnimalService } from "../services/animal.service";
import { useFarmStore } from "@/features/farms/context/use-farm-store";
import toast from "react-hot-toast";
import { AnimalDataTransformer } from "../ adapters/animal-form.adapter";

const schema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  number: z.string().min(1, { message: "El número es requerido" }),
  description: z.string().optional(),
  dateOfBirth: z.date().optional(),
  dateOfPurchase: z.date().optional(),
  purpose: z.nativeEnum(Purpose, { message: "El proposito es requerido" }),
  status: z.nativeEnum(StatusAnimal, { message: "El estado es requerido" }),
  sex: z.nativeEnum(AnimalSex, { message: "El sexo es requerido" }),
  motherId: z.string().optional(),
  fatherId: z.string().optional(),
  lotId: z.string().min(1, { message: "El lote es requerido" }),
  breedId: z.string().optional(),
});

export type FormFieldsAnimal = z.infer<typeof schema>;

interface FormProps {
  animal?: Animal;
}

export const useAnimalForm = ({ animal }: FormProps) => {
  const router = useRouter();
  const { farm } = useFarmStore();

  const methods = useForm<FormFieldsAnimal>({
    resolver: zodResolver(schema),
    defaultValues: AnimalDataTransformer.mapAnimalToFormFields(animal),
  });

  const handleCreate = async (data: FormFieldsAnimal) => {
    const apiData = AnimalDataTransformer.mapFormDataToApi(data);
    await AnimalService.getInstance().create(apiData);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ANIMALS] });
    toast.success("Animal creado");
    router.push(`/management/farm/${farm?.id}/animal/list`);
  };

  const handleUpdate = async (data: FormFieldsAnimal) => {
    if (!animal) return;
    const apiData = AnimalDataTransformer.mapFormDataToApi(data);
    await AnimalService.getInstance().update(animal.id, apiData);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ANIMALS] });
    toast.success("Animal actualizado");
    router.push(`/management/farm/${farm?.id}/animal/list`);
  };

  const onSubmit: SubmitHandler<FormFieldsAnimal> = async (data) => {
    try {
      if (!farm) {
        toast.error("Seleccione una finca para crear un animal");
        return;
      }

      if (animal) {
        await handleUpdate(data);
      } else {
        await handleCreate(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al procesar la solicitud");
    }
  };

  return {
    onSubmit,
    methods,
    isSubmiting: methods.formState.isSubmitting,
  };
};
