import { ContentLayout } from "@/core/layout/content/content-layout";
import NewVaccineView from "@/features/vaccines/presentation/views/new-vaccine-view";

export default function CreatePage() {
  return (
    <ContentLayout title="Nueva vacuna">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Crear nueva vacuna</h2>
        <NewVaccineView />
      </div>
    </ContentLayout>
  );
}
