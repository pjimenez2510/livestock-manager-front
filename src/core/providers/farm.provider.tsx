"use client";

import React, { useEffect } from "react";
import { ContentLayout } from "../layout/content/content-layout";
import { redirect } from "next/navigation";
import { Farm } from "@/features/farms/interfaces/farm.interface";
import { useFarmStore } from "@/features/farms/context/use-farm-store";

interface FarmProviderProps {
  children: React.ReactNode;
  farmParams?: Farm;
}

export const FarmProvider: React.FC<FarmProviderProps> = ({
  children,
  farmParams,
}) => {
  const { loading, setFarm } = useFarmStore((state) => state);
  useEffect(() => {
    if (!farmParams) {
      redirect("/management/farm");
    }
    setFarm({ farm: farmParams });
  }, [farmParams, setFarm]);

  if (loading)
    return <ContentLayout title="Cargando finca...">Cargando...</ContentLayout>;

  return children;
};
