import { Skeleton } from "@/components/ui/skeleton";

const LoadingDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="w-full h-[134px]"></Skeleton>
        <Skeleton className="w-full h-[134px]"></Skeleton>
        <Skeleton className="w-full h-[134px]"></Skeleton>
        <Skeleton className="w-full h-[134px]"></Skeleton>
      </div>
      <Skeleton className="h-[166px]"></Skeleton>
    </div>
  );
};

export default LoadingDashboard;
