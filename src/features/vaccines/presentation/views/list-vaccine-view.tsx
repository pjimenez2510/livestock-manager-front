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
import { useVaccinesQuery } from "../../hooks/use-vaccine-query";
import { IntervalTypeSpanish } from "../../constants/IntervalTypeSpanish";

export default function ListVaccineView() {
  const { data: vaccines } = useVaccinesQuery();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Vacunas</h1>
          <p className="text-sm text-muted-foreground">
            Lista de todas las vacunas
          </p>
        </div>
        <Link className={buttonVariants()} href={`/management/vaccine/create`}>
          Nueva vacuna
        </Link>
      </div>
      {!vaccines || vaccines.length === 0 ? (
        <div className="p-10">
          <p className="text-xl">No hay vacunas para mostrar</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Intervalo de vacunación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaccines?.map((vaccine) => (
              <TableRow key={vaccine.id}>
                <TableCell>{vaccine.name}</TableCell>
                <TableCell>{vaccine.description}</TableCell>
                <TableCell>
                  {vaccine.intervalDays}{" "}
                  {vaccine.intervalType &&
                    IntervalTypeSpanish[vaccine.intervalType]}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      className="rounded-md"
                      onClick={() =>
                        router.push(`/management/vaccine/edit/${vaccine.id}`)
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
