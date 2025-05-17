import { ChevronRight } from "lucide-react";

interface BreadcrumbsLoadingProps {
  segmentCount?: number;
}

export default function BreadcrumbsLoading({
  segmentCount = 1,
}: BreadcrumbsLoadingProps) {
  return (
    <nav aria-label="Breadcrumb" className="hidden py-2 lg:block">
      <ol className="flex items-center space-x-2">
        <li className="flex gap-2">
          <div className="text-muted-foreground flex items-center">
            <span className="body-sm">Home</span>
          </div>
          <ChevronRight className="text-muted-foreground h-4 w-4" />
        </li>
        {Array.from({ length: segmentCount }).map((_, index) => (
          <li key={index} className="flex items-center space-x-2">
            <div
              className={
                "body-sm bg-muted-foreground h-4 w-16 animate-pulse rounded-sm text-transparent"
              }
            ></div>
            {index < segmentCount - 1 && (
              <ChevronRight className="text-muted-foreground h-4 w-4" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
