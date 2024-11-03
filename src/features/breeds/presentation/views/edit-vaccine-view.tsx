"use client";

import { useRouter } from "next/navigation";
import { BreedForm } from "../components/breed-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useBreedByIdQuery } from "../../hooks/use-breed-query";

interface EditViewProps {
  id: number;
}

export default function EditBreedView({ id }: EditViewProps) {
  const { data: breed, isLoading, isFetching } = useBreedByIdQuery(id);
  const router = useRouter();
  if (isLoading || isFetching) {
    return (
      <div className="flex flex-row justify-center gap-4">
        <LoadingSpinner /> Cargando datos de la raza...
      </div>
    );
  }

  if (!breed) {
    router.push(`/management/breed/list`);
    return null;
  }
  return <BreedForm breed={breed} />;
}
