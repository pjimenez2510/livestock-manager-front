import { ContentLayout } from "@/core/layout/content/content-layout";
import ListVaccineView from "@/features/vaccines/presentation/views/list-vaccine-view";

export default function ListPage() {
  return (
    <ContentLayout title="Lista de vacunas">
      <ListVaccineView />
    </ContentLayout>
  );
}
