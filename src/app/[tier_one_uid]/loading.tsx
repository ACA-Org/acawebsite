import { Skeleton } from "@/components/ui/skeleton";
import BreadcrumbsLoading from "@/components/breadcrumbs/loading";
import { RightMenuSkeleton } from "@/components/right-menu/RightMenuSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto mb-28 flex w-full max-w-[1440px] flex-col px-4 md:px-8">
      <Skeleton className="relative mt-16 flex h-full min-h-[585px] w-full shrink-0 items-end gap-2.5 overflow-clip rounded-[12px] p-12" />

      <div className="mx-auto mt-12 w-full max-w-[1440px]">
        <div className="flex flex-col gap-12">
          <BreadcrumbsLoading />

          <Skeleton className="z-20 my-4.5 h-13 w-56 font-semibold text-blue-300" />
        </div>
      </div>
      <div className="my-12 flex flex-row gap-16 max-md:flex-col-reverse">
        <div className="flex w-3/4 flex-col items-start gap-12 max-lg:w-2/3 max-md:w-full">
          <div>
            <Skeleton className="h-13 p-4.5 font-semibold text-blue-300" />
          </div>
        </div>

        <div className="ml-auto w-1/4 max-lg:w-1/3 max-md:w-full">
          <RightMenuSkeleton />
        </div>
      </div>
    </div>
  );
}

