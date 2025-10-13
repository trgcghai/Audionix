import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface LineChartComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKey: string;
  xAxisKey: string;
}

export default function LineChartComponent({
  data,
  dataKey,
  xAxisKey,
}: LineChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey={xAxisKey}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="var(--primary)"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
