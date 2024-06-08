import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export default function MapHome({ locationValue }: { locationValue: string }) {
  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <div className="">
      <LazyMap locationValue={locationValue} />
    </div>
  );
}
