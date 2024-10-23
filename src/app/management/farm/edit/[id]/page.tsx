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
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Editar la finca</h2>
        <EditFarmView id={Number(params?.id)} />
      </div>
    </ContentLayout>
  );
}
