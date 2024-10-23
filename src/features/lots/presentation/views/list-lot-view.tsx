"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLotsQuery } from "../../hooks/use-lot-query";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PurposeSpanish } from "../../constants/purpose";
import { useFarmStore } from "@/features/farms/context/use-farm-store";
import { useRouter } from "next/navigation";

export default function ListLotView() {
  const { farm } = useFarmStore();
  const { data: lots } = useLotsQuery({ farmId: farm?.id });
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lotes</h1>
          <p className="text-sm text-muted-foreground">
            Lista de todos los lotes de la finca <strong>{farm?.name}</strong>
          </p>
        </div>
        <Link
          className={cn(buttonVariants())}
          href={`/management/farm/${farm?.id}/lot/create`}
        >
          Nuevo lote
        </Link>
      </div>
      {lots?.length === 0 && (
        <Card className="p-10">
          <p className="text-xl">No hay lotes en esta finca</p>
        </Card>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {lots?.map((lot) => (
          <Card key={lot.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <CardTitle className="text-lg font-medium">{lot.name}</CardTitle>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  className="rounded-md"
                  onClick={() =>
                    router.push(
                      `/management/farm/${farm?.id}/lot/edit/${lot.id}`
                    )
                  }
                >
                  Editar
                </Button>
                <Button variant="destructive" className="rounded-md">
                  Eliminar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Dimensión: </strong>
                {lot.dimension} héctareas
              </p>
              <p>
                <strong>Proposito: </strong>
                {PurposeSpanish[lot.purpose]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
