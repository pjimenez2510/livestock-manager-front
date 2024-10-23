import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { LotService } from "../services/lot.service";
import { useEffect } from "react";
import { unsubscribe } from "@/lib/unsubscribe";

export const useLotsQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.LOTS],
    queryFn: async () => await LotService.getInstance().getAll(),
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.LOTS]);
    };
  }, []);

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
