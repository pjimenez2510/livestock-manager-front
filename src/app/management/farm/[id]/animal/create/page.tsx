import { ContentLayout } from "@/core/layout/content/content-layout";
import NewAnimalView from "@/features/animals/presentation/views/new-animal-view";

export default function CreatePage() {
  return (
    <ContentLayout title="Nuevo animal">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Crear nuevo animal</h2>
        <NewAnimalView />
      </div>
    </ContentLayout>
  );
}
