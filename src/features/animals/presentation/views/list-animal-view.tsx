"use client";

import * as React from "react";

import { useAnimalsQuery } from "../../hooks/use-animal-query";
import { useFarmStore } from "@/features/farms/context/use-farm-store";

import useAnimalFilter from "../../hooks/use-animal-filter";
import AnimalTable from "../components/table/table-animal";
import { StatusAnimal } from "../../interfaces/animal.interface";
import { useLotsQuery } from "@/features/lots/hooks/use-lot-query";

export default function ListAnimalView() {
  const { farm } = useFarmStore();
  const { methods, values } = useAnimalFilter({
    filterOptions: { lot: { farmId: farm?.id }, status: StatusAnimal.ALIVE },
  });
  const { data: animals } = useAnimalsQuery(values);
  const { data: lots } = useLotsQuery({ farmId: farm?.id });

  React.useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <AnimalTable
      animals={animals || []}
      idFarm={farm?.id}
      methods={methods}
      lots={lots || []}
    ></AnimalTable>
  );
}
