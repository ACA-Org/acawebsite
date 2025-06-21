import React from "react";
import { Skeleton } from "../../../ui/skeleton";

export const FacilityCardSkeleton = React.memo(() => {
  return (
    <div className="right-4 bottom-4 left-4 z-10 my-2 px-4">
      <div className="relative flex h-fit cursor-pointer flex-col rounded-lg border border-solid border-blue-300 bg-white p-4 shadow-[0px_8px_24px_#00000014] transition-all">
        <div className="mb-4">
          <Skeleton className="mb-1 h-[29px] w-3/4" />

          <Skeleton className="h-[18px] w-1/2" />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-start gap-2.5">
            <Skeleton className="h-5 w-5 flex-shrink-0 rounded-sm" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>

          <Skeleton className="h-13 w-full rounded-sm" />
        </div>
      </div>
    </div>
  );
});

FacilityCardSkeleton.displayName = "FacilityCardSkeleton";

