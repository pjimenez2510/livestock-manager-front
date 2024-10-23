import { FarmProvider } from "@/core/providers/farm.provider";
import { FarmService } from "@/features/farms/services/farm.service";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const farm = await FarmService.getInstance()
    .getById(Number(params.id))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      return undefined;
    });

  return <FarmProvider farmParams={farm}>{children}</FarmProvider>;
}
