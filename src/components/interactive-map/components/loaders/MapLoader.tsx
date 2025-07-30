import { Skeleton } from "@/components/ui/skeleton";
import { FilterInputsSkeleton } from "./FilterInputsSkeleton";
import { FacilityCardSkeleton } from "./FacilityCardSkeleton";

export function MapLoader() {
  return (
    <div className="flex h-[700px] w-full flex-col overflow-clip rounded-l-xl rounded-r-none border border-solid border-[#aed2ff] sm:flex-row">
      <div className="relative hidden flex-1 sm:block">
        <Skeleton className="h-full w-full !rounded-r-none" />
      </div>

      <div className="hidden w-[368px] border-l border-[#aed2ff] bg-blue-50 lg:flex lg:flex-col">
        <div className="border-b border-[#aed2ff] p-4">
          <FilterInputsSkeleton />
        </div>
        <div className="flex-1 overflow-hidden">
          {[1, 2].map((i) => (
            <FacilityCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
