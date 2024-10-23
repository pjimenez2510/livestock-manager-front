"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { useFarmsQuery } from "../../hooks/use-farm-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useFarmStore } from "../../context/use-farm-store";
import { useEffect } from "react";

const FarmList = () => {
  const { data: farms, isLoading } = useFarmsQuery();
  const { farm: selectedFarm, setFarm } = useFarmStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!selectedFarm && farms && farms?.length !== 0) {
      setFarm({ farm: farms[0] });
    }
  }, [farms, selectedFarm, setFarm]);

  return (
    <ScrollArea className="h-24 w-full">
      <div className="flex gap-3 h-full w-full">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="w-full h-full" key={i} />
          ))}
        {!isLoading && (
          <>
            {farms?.map((farm) => (
              <Button
                key={farm.id}
                className="flex items-center justify-center w-full h-full text-wrap"
                variant={selectedFarm?.id === farm.id ? "default" : "secondary"}
                onClick={() => router.push(`/management/farm/${farm.id}`)}
              >
                {farm.name}
              </Button>
            ))}
            <Button
              className="flex items-center justify-center min-w-24 h-full"
              variant={"outline"}
              onClick={() => router.push("/management/farm/create")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default FarmList;
