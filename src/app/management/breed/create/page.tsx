import { ContentLayout } from "@/core/layout/content/content-layout";
import NewBreedView from "@/features/breeds/presentation/views/new-breed-view";

export default function CreatePage() {
  return (
    <ContentLayout title="Nueva raza">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Crear nueva raza</h2>
        <NewBreedView />
      </div>
    </ContentLayout>
  );
}
