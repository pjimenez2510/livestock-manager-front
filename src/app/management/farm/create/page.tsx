import { ContentLayout } from "@/core/layout/content/content-layout";
import NewFarmView from "@/features/farms/presentation/views/new-farm-view";

export default function CreatePage() {
  return (
    <ContentLayout title="Nueva finca">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Crear nueva finca</h2>
        <NewFarmView />
      </div>
    </ContentLayout>
  );
}
