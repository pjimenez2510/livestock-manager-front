import { auth } from "@/auth.config";
import DashboardPanelLayout from "@/core/layout/content/dashboard-layout";
import { redirect } from "next/navigation";

export default async function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <DashboardPanelLayout>{children}</DashboardPanelLayout>;
}
