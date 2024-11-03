import { ContentLayout } from "@/core/layout/content/content-layout";
import EditAnimalView from "@/features/animals/presentation/views/edit-animal-view";

interface EditLotPageProps {
  params: {
    idAnimal: string;
  };
}

export default function EditPage({ params }: EditLotPageProps) {
  return (
    <ContentLayout title="Editar animal">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Editar el animal</h2>
        <EditAnimalView id={Number(params?.idAnimal)} />
      </div>
    </ContentLayout>
  );
}
