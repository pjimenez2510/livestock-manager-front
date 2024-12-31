import { ContentLayout } from "@/core/layout/content/content-layout";
import CalendarioEventos from "@/features/events/presentation/view/list-event-view";

export default function Page() {
  return (
    <ContentLayout title="Agenda">
      <CalendarioEventos />
    </ContentLayout>
  );
}
