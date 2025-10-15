import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const RightMenuSkeleton = () => {
  return (
    <div className="no-scrollbar sticky top-24 max-h-[calc(100dvh-6rem)] overflow-scroll">
      <div className="h-[60px] w-full border-b border-blue-100 pt-[18px] pb-5 pl-5">
        <p className="body-xl font-semibold text-blue-300">In This Section</p>
      </div>

      <div className="divide-y divide-blue-500/10">
        <div className="w-full divide-y divide-blue-500/12 border-b border-blue-500/12">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between">
                <Skeleton
                  className={cn("h-5", index % 2 === 0 ? "w-40" : "w-32")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
