import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ReactElement } from "react";

interface ChartCardProps {
  title: string;
  description: string;
  config: ChartConfig;
  className?: string;
  children: ReactElement;
}

export default function ChartCard({
  title,
  description,
  config,
  className = "h-[300px]",
  children,
}: ChartCardProps) {
  return (
    <Card className="bg-card border-border">
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
