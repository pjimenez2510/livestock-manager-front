import { ContentLayout } from "@/core/layout/content/content-layout";
import DashboardFarmView from "@/features/farms/presentation/views/dashboard-farm";

export const revalidate = 0;
interface FarmPageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: FarmPageProps) {
  return (
    <ContentLayout title="Finca">
      <DashboardFarmView id={Number(params?.id)} />
    </ContentLayout>
  );
}
