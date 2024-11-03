"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAnimalsQuery } from "../../hooks/use-animal-query";
import { useFarmStore } from "@/features/farms/context/use-farm-store";
import { animalStatusSpanish } from "../../constants/animal-status-spanish";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { animalSexSpanish } from "../../constants/animal-sex-spanish";

export default function ListAnimalView() {
  const { farm } = useFarmStore();
  const { data: animals } = useAnimalsQuery({ lot: { farmId: farm?.id } });
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Animales</h1>
          <p className="text-sm text-muted-foreground">
            Lista de todos los animales
          </p>
        </div>
        <Link
          className={buttonVariants()}
          href={`/management/farm/${farm?.id}/animal/create`}
        >
          Nuevo animal
        </Link>
      </div>
      {!animals || animals.length === 0 ? (
        <div className="p-10">
          <p className="text-xl">No hay animales para mostrar</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Sexo</TableHead>
              <TableHead>Fecha de nacimiento</TableHead>
              <TableHead>Fecha de compra</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animals?.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.number}</TableCell>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.description}</TableCell>
                <TableCell>
                  <Badge
                    className={cn([
                      "text-xs",
                      animalSexSpanish[animal.sex]?.class,
                    ])}
                  >
                    {animalSexSpanish[animal.sex]?.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {animal?.dateOfBirth &&
                    formatDate(animal?.dateOfBirth, "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {animal?.dateOfPurchase &&
                    formatDate(animal?.dateOfPurchase, "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn([
                      "text-xs",
                      animalStatusSpanish[animal.status]?.class,
                    ])}
                  >
                    {animalStatusSpanish[animal.status]?.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      className="rounded-md"
                      onClick={() =>
                        router.push(
                          `/management/farm/${farm?.id}/animal/edit/${animal.id}`
                        )
                      }
                    >
                      Editar
                    </Button>
                    <Button variant="destructive" className="rounded-md">
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
