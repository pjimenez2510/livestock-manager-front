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
import { useBreedsQuery } from "../../hooks/use-breed-query";

export default function ListBreedView() {
  const { data: breeds } = useBreedsQuery();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Razas</h1>
          <p className="text-sm text-muted-foreground">
            Lista de todas las razas
          </p>
        </div>
        <Link className={buttonVariants()} href={`/management/breed/create`}>
          Nueva raza
        </Link>
      </div>
      {!breeds || breeds.length === 0 ? (
        <div className="p-10">
          <p className="text-xl">No hay razas para mostrar</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {breeds?.map((breed) => (
              <TableRow key={breed.id}>
                <TableCell>{breed.name}</TableCell>
                <TableCell>{breed.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      className="rounded-md"
                      onClick={() =>
                        router.push(`/management/breed/edit/${breed.id}`)
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
