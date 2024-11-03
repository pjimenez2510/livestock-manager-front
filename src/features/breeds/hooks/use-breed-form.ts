"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/shared/api/query-key";
import queryClient from "@/core/infrastructure/react-query/query-client";
import { Breed } from "../interfaces/breed.interface";
import { BreedService } from "../services/breed.service";

const schema = z.object({
  name: z.string().min(1, "El nombre de la raza es requerido"),
  description: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

interface FormProps {
  breed?: Breed;
}

export const useBreedForm = ({ breed }: FormProps) => {
  const router = useRouter();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: breed?.name || "",
      description: breed?.description || "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (breed) {
      await BreedService.getInstance()
        .update(breed.id, data)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BREEDS] });
          router.push(`/management/breed/list`);
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    await BreedService.getInstance()
      .create(data)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BREEDS] });
        router.push(`/management/breed/list`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
};
