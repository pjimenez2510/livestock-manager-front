"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUERY_KEYS } from "@/shared/api/query-key";
import queryClient from "@/core/infrastructure/react-query/query-client";
import { Event } from "../interfaces/event.interface";
import { EventService } from "../services/event.service";

const schema = z.object({
  title: z.string().min(1, "El nombre del evento es requerido"),
  description: z.string().optional(),
  color: z.string().min(1, "El color del evento es requerido"),
  startDate: z.date(),
  endDate: z.date(),
});

type FormFields = z.infer<typeof schema>;

interface FormProps {
  event?: Event;
}

export const useEventForm = ({ event }: FormProps) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      color: event?.color || "",
      startDate: event?.startDate || undefined,
      endDate: event?.endDate || undefined,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (event && event.id !== 0) {
      await EventService.getInstance()
        .update(event.id, {
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    await EventService.getInstance()
      .create({
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
};
