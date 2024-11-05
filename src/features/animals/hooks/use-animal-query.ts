"use client";

import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { AnimalService } from "../services/animal.service";
import { FilterAnimalsParams } from "../interfaces/animal-filter.interface";

export const useAnimalsQuery = (filter?: FilterAnimalsParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.ANIMALS, JSON.stringify(filter)],
    queryFn: async () => await AnimalService.getInstance().getAll(filter),
  });

  return query;
};

export const useAnimalByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.ANIMALS, String(id)],
    queryFn: async () => await AnimalService.getInstance().getById(id),
    enabled: !!id,
  });

  return query;
};
