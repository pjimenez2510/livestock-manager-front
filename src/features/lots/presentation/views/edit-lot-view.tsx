"use client";

import { useRouter } from "next/navigation";
import { LotForm } from "../components/lot-form";
import { useLotByIdQuery } from "../../hooks/use-lot-query";
import { useFarmStore } from "@/features/farms/context/use-farm-store";

interface EditLotViewProps {
  id: number;
}

export default function EditLotView({ id }: EditLotViewProps) {
  const { data: lot } = useLotByIdQuery(id);
  const { farm } = useFarmStore();
  const router = useRouter();
  if (!lot) {
    router.push(`/management/farm/${farm?.id}/lot/list`);
    return null;
  }
  return <LotForm lot={lot} />;
}
