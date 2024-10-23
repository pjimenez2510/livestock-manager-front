import { ContentLayout } from "@/core/layout/content/content-layout";
import NewFarmView from "@/features/farms/presentation/views/new-farm-view";

export default function CreatePage() {
  return (
    <ContentLayout title="Nueva finca">
      <NewFarmView />
    </ContentLayout>
  );
}
