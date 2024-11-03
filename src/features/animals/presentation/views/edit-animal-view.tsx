"use client";

import { useRouter } from "next/navigation";
import { AnimalForm } from "../components/animal-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAnimalByIdQuery } from "../../hooks/use-animal-query";
import { useFarmStore } from "@/features/farms/context/use-farm-store";

interface EditViewProps {
  id: number;
}

export default function EditAnimalView({ id }: EditViewProps) {
  const { data: animal, isLoading, isFetching } = useAnimalByIdQuery(id);
  const { farm } = useFarmStore();
  const router = useRouter();
  if (isLoading || isFetching) {
    return (
      <div className="flex flex-row justify-center gap-4">
        <LoadingSpinner /> Cargando datos del animal...
      </div>
    );
  }

  if (!animal) {
    router.push(`/management/farm/${farm?.id}/animal/list`);
    return null;
  }
  return <AnimalForm animal={animal} />;
}
