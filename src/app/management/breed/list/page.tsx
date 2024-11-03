import { ContentLayout } from "@/core/layout/content/content-layout";
import ListBreedView from "@/features/breeds/presentation/views/list-breed-view";

export default function ListPage() {
  return (
    <ContentLayout title="Lista de razas">
      <ListBreedView />
    </ContentLayout>
  );
}
