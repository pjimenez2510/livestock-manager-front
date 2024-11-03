"use client";

import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { unsubscribe } from "@/lib/unsubscribe";
import { BreedService } from "../services/breed.service";

export const useBreedsQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.BREEDS],
    queryFn: async () => await BreedService.getInstance().getAll(),
  });

  return query;
};

export const useBreedByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.BREEDS, String(id)],
    queryFn: async () => await BreedService.getInstance().getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.BREEDS, String(id)]);
    };
  }, [id]);

  return query;
};
