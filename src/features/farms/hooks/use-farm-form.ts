"use client";

import { z } from "zod";
import { Farm, Purpose } from "../interfaces/farm.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FarmService } from "../services/farm.service";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/shared/api/query-key";
import queryClient from "@/core/infrastructure/react-query/query-client";
import { useFarmStore } from "../context/use-farm-store";

const schema = z.object({
  name: z.string().min(1, "El nombre de la finca es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  purpose: z.enum([Purpose.DualPurpose, Purpose.Meat, Purpose.Milk], {
    message: "El proposito es requerido",
  }),
  dimension: z.coerce
    .number({ message: "La dimensión debe ser un número" })
    .min(1, "La dimension debe ser igula o mayor a 1"),
});

type FormFields = z.infer<typeof schema>;

interface FarmFormProps {
  farm?: Farm;
}

export const useFarmForm = ({ farm }: FarmFormProps) => {
  const { setFarm } = useFarmStore();
  const router = useRouter();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: farm?.name || "",
      address: farm?.address || "",
      dimension: farm?.dimension || undefined,
      purpose: farm?.purpose || undefined,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (farm) {
      await FarmService.getInstance()
        .update(farm.id, data)
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FARMS] });
          setFarm({ farm: response });
          router.push(`/management/farm/${response.id}`);
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    await FarmService.getInstance()
      .create(data)
      .then((response) => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FARMS] });
        setFarm({ farm: response });
        router.push(`/management/farm/${response.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
};
