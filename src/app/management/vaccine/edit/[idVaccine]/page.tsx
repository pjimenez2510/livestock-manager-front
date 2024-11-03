import { ContentLayout } from "@/core/layout/content/content-layout";
import EditVaccineView from "@/features/vaccines/presentation/views/edit-vaccine-view";

interface EditPageProps {
  params: {
    idVaccine: string;
  };
}

export default function EditPage({ params }: EditPageProps) {
  return (
    <ContentLayout title="Editar vacuna">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Editar vacuna</h2>
        <EditVaccineView id={Number(params?.idVaccine)} />
      </div>
    </ContentLayout>
  );
}
