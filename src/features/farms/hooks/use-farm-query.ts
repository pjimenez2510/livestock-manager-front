import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { FarmService } from "../services/farm.service";
import { useEffect } from "react";
import { unsubscribe } from "@/lib/unsubscribe";

export const useFarmsQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.FARMS],
    queryFn: async () => await FarmService.getInstance().getAll(),
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.FARMS]);
    };
  }, []);

  return query;
};

export const useFarmByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.FARMS, String(id)],
    queryFn: async () => await FarmService.getInstance().getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    return () => {
      unsubscribe([QUERY_KEYS.FARMS, String(id)]);
    };
  }, [id]);

  return query;
};
