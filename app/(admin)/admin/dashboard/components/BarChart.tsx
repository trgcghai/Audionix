import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKeys: string[];
  xAxisKey: string;
  isVertical?: boolean;
  colors?: string[];
}

export default function BarChartComponent({
  data,
  dataKeys,
  xAxisKey,
  isVertical = false,
  colors = ["var(--primary)", "var(--secondary)"],
}: BarChartComponentProps) {
  if (isVertical) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--foreground))" fontSize={12} />
          <YAxis
            dataKey={xAxisKey}
            type="category"
            width={120}
            stroke="hsl(var(--foreground))"
            fontSize={12}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index] || colors[0]}
              radius={[0, 4, 4, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey={xAxisKey}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {dataKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[index] || colors[0]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
