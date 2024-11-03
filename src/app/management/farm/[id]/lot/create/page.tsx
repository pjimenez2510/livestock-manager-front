import { ContentLayout } from "@/core/layout/content/content-layout";
import NewLotView from "@/features/lots/presentation/views/new-lot-view";

export default function CreatePage() {
  return (
    <ContentLayout title="Nuevo lote">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Crear nuevo lote</h2>
        <NewLotView />
      </div>
    </ContentLayout>
  );
}
