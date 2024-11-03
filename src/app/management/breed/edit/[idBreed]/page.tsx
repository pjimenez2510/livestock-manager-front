import { ContentLayout } from "@/core/layout/content/content-layout";
import EditBreedView from "@/features/breeds/presentation/views/edit-vaccine-view";

interface EditPageProps {
  params: {
    idBreed: string;
  };
}

export default function EditPage({ params }: EditPageProps) {
  return (
    <ContentLayout title="Editar raza">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Editar raza</h2>
        <EditBreedView id={Number(params?.idBreed)} />
      </div>
    </ContentLayout>
  );
}
