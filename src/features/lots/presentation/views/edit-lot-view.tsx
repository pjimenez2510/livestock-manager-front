"use client";

import { useRouter } from "next/navigation";
import { LotForm } from "../components/lot-form";
import { useLotByIdQuery } from "../../hooks/use-lot-query";
import { useFarmStore } from "@/features/farms/context/use-farm-store";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface EditLotViewProps {
  id: number;
}

export default function EditLotView({ id }: EditLotViewProps) {
  const { data: lot, isLoading, isFetching } = useLotByIdQuery(id);
  const { farm } = useFarmStore();
  const router = useRouter();
  if (isLoading || isFetching) {
    return (
      <div className="flex flex-row justify-center gap-4">
        <LoadingSpinner /> Cargando datos del lote...
      </div>
    );
  }

  if (!lot) {
    router.push(`/management/farm/${farm?.id}/lot/list`);
    return null;
  }
  return <LotForm lot={lot} />;
}
