import { ContentLayout } from "@/core/layout/content/content-layout";
import ListAnimalView from "@/features/animals/presentation/views/list-animal-view";

export default function ListPage() {
  return (
    <ContentLayout title="Lista de animales">
      <ListAnimalView />
    </ContentLayout>
  );
}
