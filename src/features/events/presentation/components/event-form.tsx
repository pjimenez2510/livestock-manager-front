"use client";
import RHFInput from "@/components/rhf/RHFInput";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import { useEventForm } from "../../hooks/use-event-form";
import { Event } from "../../interfaces/event.interface";
import RHFDateTimePicker from "@/components/rhf/data-time-picker";

interface FormProps {
  event?: Event;
}

export const EventForm = ({ event }: FormProps) => {
  const { methods, onSubmit, isSubmiting } = useEventForm({ event });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-xl"
      >
        <RHFInput name="title" label="Nombre del evento" />
        <RHFInput name="description" label="Descripción" />
        <RHFInput name="color" label="Color" />

        <RHFDateTimePicker name="startDate" label="Fecha de inicio" />

        <RHFDateTimePicker name="endDate" label="Fecha de fin" />

        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? <LoadingSpinner /> : "Guardar"}
        </Button>
      </form>
    </FormProvider>
  );
};
