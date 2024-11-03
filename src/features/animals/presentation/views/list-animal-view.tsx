"use client";

import * as React from "react";

import { useAnimalsQuery } from "../../hooks/use-animal-query";
import { useFarmStore } from "@/features/farms/context/use-farm-store";

import useAnimalFilter from "../../hooks/use-animal-filter";
import AnimalTable from "../components/animal-table";
import { StatusAnimal } from "../../interfaces/animal.interface";

export default function ListAnimalView() {
  const { farm } = useFarmStore();
  const { methods, values } = useAnimalFilter({
    filterOptions: { lot: { farmId: farm?.id }, status: StatusAnimal.ALIVE },
  });
  const { data: animals } = useAnimalsQuery(values);

  React.useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <AnimalTable
      animals={animals || []}
      idFarm={farm?.id}
      methods={methods}
    ></AnimalTable>
  );
}
