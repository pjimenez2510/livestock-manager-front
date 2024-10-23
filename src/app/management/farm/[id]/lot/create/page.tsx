import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContentLayout } from "@/core/layout/content/content-layout";

export default function CreatePage() {
  return (
    <ContentLayout title="Nueva finca">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        Crear nueva finca
        <form className="flex flex-col lg:min-w-96 items-center justify-center gap-4">
          <div className="mt-1 w-full">
            <Label htmlFor="name" className="ml-1 ">
              Nombre
            </Label>
            <Input id="name" className="mt-1" />
          </div>
          <div className="mt-1 w-full">
            <Label htmlFor="description" className="ml-1 ">
              Descripción
            </Label>
            <Input id="description" className="mt-1" />
          </div>
          <div className="mt-1 w-full">
            <Label htmlFor="address" className="ml-1 ">
              Dirección
            </Label>
            <Input id="address" className="mt-1" />
          </div>

          <Button type="submit">Guardar</Button>
        </form>
      </div>
    </ContentLayout>
  );
}
