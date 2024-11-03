"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PurposeSpanish } from "../../constants/purpose";
import { useFarmByIdQuery } from "../../hooks/use-farm-query";
import { redirect } from "next/navigation";
import LoadingDashboard from "../components/loading-dashboard";
import { CiGrid42 } from "react-icons/ci";
import { GiCow } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { MdPointOfSale } from "react-icons/md";

interface DashboardFarmViewProps {
  id: number;
}

export default function DashboardFarmView({ id }: DashboardFarmViewProps) {
  const { data: farm, isLoading, isFetching } = useFarmByIdQuery(id);

  if (!id) {
    redirect("/management/farm");
  }

  if (isLoading || isFetching) {
    return <LoadingDashboard />;
  }

  if (!farm) {
    redirect("/management/farm");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Lotes</CardTitle>
            <CiGrid42 className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+10</div>
            <p className="text-xs text-muted-foreground">
              Divisiones de la finca
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Animales</CardTitle>
            <GiCow className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+230</div>
            <p className="text-xs text-muted-foreground">Animales vivos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Gestaciones</CardTitle>
            <FaHeartbeat className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+34</div>

            <p className="text-xs text-muted-foreground">
              Vacas en estado de gestación
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Ventas</CardTitle>
            <MdPointOfSale className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">Animales vendidos</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">{farm?.name}</CardTitle>
          <Link
            href={`/management/farm/edit/${farm?.id}`}
            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Editar
          </Link>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Dirección: </strong>
            {farm?.address}
          </p>
          <p>
            <strong>Dimensión: </strong>
            {farm?.dimension} héctareas
          </p>
          <p>
            <strong>Proposito: </strong>
            {PurposeSpanish[farm?.purpose]}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
