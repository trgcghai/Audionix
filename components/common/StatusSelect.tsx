import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";

interface TrackStatusProps {
  items: { key: string; value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  title: string;
}

const StatusSelect = ({
  items,
  value,
  title,
  onChange,
  disabled = false,
  className = "",
}: TrackStatusProps) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={cn("flex-1 rounded-full", className)}>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {items.map((status) => (
          <SelectItem
            key={status.key}
            value={status.value}
            className="capitalize"
          >
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default StatusSelect;
