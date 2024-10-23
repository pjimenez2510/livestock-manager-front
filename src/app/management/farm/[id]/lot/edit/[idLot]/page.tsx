import { ContentLayout } from "@/core/layout/content/content-layout";
import EditLotView from "@/features/lots/presentation/views/edit-lot-view";

interface EditLotPageProps {
  params: {
    idLot: string;
  };
}

export default function EditPage({ params }: EditLotPageProps) {
  return (
    <ContentLayout title="Editar lote">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Editar el lote</h2>
        <EditLotView id={Number(params?.idLot)} />
      </div>
    </ContentLayout>
  );
}
