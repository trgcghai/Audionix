import { TrackStatusValues } from "@/app/constant";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { cn } from "@/libs/utils";

interface StatusFilterProps {
  value: Option[];
  onChange: (e: Option[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const StatusFilter = ({
  value,
  onChange,
  placeholder = "Select status",
  disabled,
  className,
  labelClassName,
  inputClassName,
}: StatusFilterProps) => {
  return (
    <div className={cn(className)}>
      <Label className={cn(labelClassName)}>Status</Label>
      <MultipleSelector
        options={TrackStatusValues.map((status) => ({
          label: status.label,
          value: status.value,
        }))}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(inputClassName)}
      />
    </div>
  );
};
export default StatusFilter;
