import React from "react";
import { Skeleton } from "../../../ui/skeleton";

export const FilterInputsSkeleton = React.memo(() => {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-12 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-1 gap-2">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 flex-1" />
      </div>
    </div>
  );
});

FilterInputsSkeleton.displayName = "FilterInputsSkeleton";

