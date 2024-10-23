import { ContentLayout } from "@/core/layout/content/content-layout";
import ListLotView from "@/features/lots/presentation/views/list-lot-view";

export default function ListPage() {
  return (
    <ContentLayout title="Lista de Lotes">
      <ListLotView />
    </ContentLayout>
  );
}
