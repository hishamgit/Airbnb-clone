import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto mt-8 w-[75%]">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-[550px] w-full mt-5" />
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="flex flex-col w-2/3 ">
          <Skeleton className="h-8 mt-5 w-full" />
          <Skeleton className="h-8 mt-5 w-full" />
          <Skeleton className="h-9 mt-5 " />
        </div>
        <div className="w-1/3">
          <Skeleton className="h-72 w-full mt-8" />
        </div>
      </div>
    </div>
  );
}
