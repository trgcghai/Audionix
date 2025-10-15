import { Skeleton } from "@/components/ui/skeleton";

const MediaSkeleton = () => (
  <div className="rounded-lg p-2">
    <Skeleton className="aspect-square w-full h-full rounded-lg" />
    <Skeleton className="mt-2 h-4 w-3/4" />
  </div>
);

export default MediaSkeleton;
