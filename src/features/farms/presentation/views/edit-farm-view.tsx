"use client";

import { useRouter } from "next/navigation";
import { useFarmByIdQuery } from "../../hooks/use-farm-query";
import { FarmForm } from "../components/farm-form";

interface EditFarmViewProps {
  id: number;
}

export default function EditFarmView({ id }: EditFarmViewProps) {
  const { data: farm } = useFarmByIdQuery(id);
  const router = useRouter();
  if (!farm) {
    router.push("/management/farm");
    return null;
  }
  return <FarmForm farm={farm} />;
}
