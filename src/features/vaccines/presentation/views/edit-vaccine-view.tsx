"use client";

import { useRouter } from "next/navigation";
import { VaccineForm } from "../components/vaccine-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useVaccineByIdQuery } from "../../hooks/use-vaccine-query";

interface EditViewProps {
  id: number;
}

export default function EditVaccineView({ id }: EditViewProps) {
  const { data: vaccine, isLoading, isFetching } = useVaccineByIdQuery(id);
  const router = useRouter();
  if (isLoading || isFetching) {
    return (
      <div className="flex flex-row justify-center gap-4">
        <LoadingSpinner /> Cargando datos del lote...
      </div>
    );
  }

  if (!vaccine) {
    router.push(`/management/vaccine/list`);
    return null;
  }
  return <VaccineForm vaccine={vaccine} />;
}
