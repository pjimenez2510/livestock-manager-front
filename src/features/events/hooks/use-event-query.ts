"use client";

import { QUERY_KEYS } from "@/shared/api/query-key";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "../services/event.service";

export const useEventsQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: async () => await EventService.getInstance().getAll(),
  });

  return query;
};

export const useEventByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.EVENTS, String(id)],
    queryFn: async () => await EventService.getInstance().getById(id),
    enabled: !!id,
  });

  return query;
};
