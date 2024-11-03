"use client";

import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { unsubscribe } from "@/lib/unsubscribe";
import { VaccineService } from "../services/vaccine.service";

export const useVaccinesQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VACCINES],
    queryFn: async () => await VaccineService.getInstance().getAll(),
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.VACCINES]);
    };
  }, []);

  return query;
};

export const useVaccineByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.VACCINES, String(id)],
    queryFn: async () => await VaccineService.getInstance().getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.VACCINES, String(id)]);
    };
  }, [id]);

  return query;
};
