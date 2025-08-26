import { TrackStatusValues } from "@/app/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";

interface TrackStatusProps {
  status: string;
  handleStatusChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const StatusSelect = ({
  status,
  handleStatusChange,
  disabled = false,
  className = "",
}: TrackStatusProps) => {
  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn("flex-1 rounded-full", className)}>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {TrackStatusValues.map((status) => (
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
