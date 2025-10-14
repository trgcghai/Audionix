import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/libs/utils";

interface ChartCardSkeletonProps {
  className?: string;
}

export default function ChartCardSkeleton({
  className = "h-[300px]",
}: ChartCardSkeletonProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className={cn("w-full", className)}>
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
