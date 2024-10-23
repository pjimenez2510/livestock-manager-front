import { ContentLayout } from "@/core/layout/content/content-layout";
import EditFarmView from "@/features/farms/presentation/views/edit-farm-view";

interface EditFarmPageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: EditFarmPageProps) {
  return (
    <ContentLayout title="Editar finca">
      <EditFarmView id={Number(params?.id)} />
    </ContentLayout>
  );
}
