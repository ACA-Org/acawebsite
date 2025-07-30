import BreadcrumbsLoading from "@/components/breadcrumbs/loading";
import { MapLoader } from "@/components/interactive-map/components/loaders/MapLoader";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <div className="mx-auto mb-28 flex w-full max-w-[1440px] flex-col px-4 md:px-8">
      <div className="relative mt-16 flex h-[300px] w-full shrink-0 items-end gap-2.5 overflow-clip rounded-[12px] p-12">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1440px]">
        <div className="flex flex-col gap-12">
          <BreadcrumbsLoading />

          <div className="flex h-17.5 items-center justify-start">
            <Skeleton className="z-20 h-13 w-56 font-semibold text-blue-300" />
          </div>
        </div>
      </div>
      <div className="my-12 flex flex-row gap-16 max-md:flex-col-reverse">
        <MapLoader />
      </div>
    </div>
  );
}
