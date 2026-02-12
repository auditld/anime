import { cn } from "@/lib/utils";

interface AnimeCardSkeletonProps {
  className?: string;
}

export default function AnimeCardSkeleton({ className }: AnimeCardSkeletonProps) {
  return (
    <div
      className={cn(
        "block rounded-lg overflow-hidden bg-card animate-pulse",
        className
      )}
    >
      <div className="relative aspect-[2/3] bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

export function AnimeGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  );
}
