"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/shared/api/query-key";
import queryClient from "@/core/infrastructure/react-query/query-client";
import { IntervalType, Vaccine } from "../interfaces/vaccine.interface";
import { VaccineService } from "../services/vaccine.service";

const schema = z.object({
  name: z.string().min(1, "El nombre de la vacuna es requerida"),
  description: z.string().optional(),
  intervalDays: z.coerce
    .number({ message: "El intervalo de vacunación debe ser un número" })
    .optional(),
  intervalType: z.enum(
    [IntervalType.Day, IntervalType.Month, IntervalType.Year],
    {
      message: "El intervalo de vacunación es requerido",
    }
  ),
});

type FormFields = z.infer<typeof schema>;

interface FormProps {
  vaccine?: Vaccine;
}

export const useVaccineForm = ({ vaccine }: FormProps) => {
  const router = useRouter();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: vaccine?.name || "",
      description: vaccine?.description || "",
      intervalDays: vaccine?.intervalDays || 0,
      intervalType: vaccine?.intervalType || IntervalType.Day,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (vaccine) {
      await VaccineService.getInstance()
        .update(vaccine.id, data)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VACCINES] });
          router.push(`/management/vaccine/list`);
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    await VaccineService.getInstance()
      .create(data)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VACCINES] });
        router.push(`/management/vaccine/list`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
};
