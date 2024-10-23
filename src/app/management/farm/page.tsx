import { FarmService } from "@/features/farms/services/farm.service";
import { redirect } from "next/navigation";

export default async function Page() {
  const farms = await FarmService.getInstance()
    .getAll()
    .then((response) => response)
    .catch((error) => console.error(error));

  if (!farms || farms.length === 0) return redirect("/management/farm/create");
  return redirect(`/management/farm/${farms[0].id}`);
}
