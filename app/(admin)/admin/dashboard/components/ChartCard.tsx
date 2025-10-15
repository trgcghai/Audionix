import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/libs/utils";
import { ReactElement } from "react";

interface ChartCardProps {
  title: string;
  description: string;
  config: ChartConfig;
  className?: string;
  containerClassName?: string;
  children: ReactElement;
}

export default function ChartCard({
  title,
  description,
  config,
  className = "h-[300px]",
  containerClassName = "",
  children,
}: ChartCardProps) {
  return (
    <Card className={cn("bg-card border-border", containerClassName)}>
      <CardHeader>
        <CardTitle className="text-card-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className={className}>
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
