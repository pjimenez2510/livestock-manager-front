"use client";

import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { LotService } from "../services/lot.service";
import { useEffect } from "react";
import { unsubscribe } from "@/lib/unsubscribe";
import { FilterLotsParams } from "../interfaces/filter-lot.interface";

export const useLotsQuery = (params?: FilterLotsParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.LOTS, JSON.stringify(params)],
    queryFn: async () => await LotService.getInstance().getAll(params),
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.LOTS, JSON.stringify(params)]);
    };
  }, [params]);

  return query;
};

export const useLotByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.LOTS, String(id)],
    queryFn: async () => await LotService.getInstance().getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.LOTS, String(id)]);
    };
  }, [id]);

  return query;
};
