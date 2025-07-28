import { TrackStatusValues } from "@/app/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatusSelect = ({
  status,
  handleStatusChange,
  disabled = false,
}: {
  status: string;
  handleStatusChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
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
