import { Skeleton } from "@/components/ui/skeleton";
import BreadcrumbsLoading from "@/components/breadcrumbs/loading";
import { RightMenuSkeleton } from "@/components/right-menu/RightMenuSkeleton";

export default function PageLoader({ tier = 1 }: { tier?: number }) {
  return (
    <div className="mx-auto mb-28 flex w-full max-w-[1440px] flex-col px-4 md:px-8">
      <Skeleton
        style={{
          minHeight: tier === 1 ? "585px" : tier === 2 ? "415px" : "300px",
        }}
        className="relative mt-16 flex h-full w-full shrink-0 items-end gap-2.5 overflow-clip rounded-[12px] p-12"
      />

      <div className="mx-auto mt-12 w-full max-w-[1440px]">
        <div className="flex flex-col gap-12">
          <BreadcrumbsLoading />

          <div className="flex h-17.5 items-center justify-start">
            <Skeleton className="z-20 h-13 w-56 font-semibold text-blue-300" />
          </div>
        </div>
      </div>
      <div className="my-12 flex flex-row gap-16 max-md:flex-col-reverse">
        <div className="flex w-3/4 flex-col items-start gap-12 max-lg:w-2/3 max-md:w-full">
          <PageTextSkeleton />
        </div>

        <div className="ml-auto w-1/4 max-lg:w-1/3 max-md:w-full">
          <RightMenuSkeleton />
        </div>
      </div>
    </div>
  );
}

function PageTextSkeleton() {
  return (
    <div className="">
      <div className="mt-7 mb-5">
        <Skeleton className="h-9.5 w-120" />
      </div>

      {[...Array(10)].map((_, index) => (
        <div key={index} className="mb-4">
          <Skeleton
            className="h-4 rounded bg-gray-200"
            style={{
              width: `${70 + ((index * 17) % 30)}%`, // Width varies between 70% and 100% based on index
            }}
          />
        </div>
      ))}
    </div>
  );
}
