import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";

interface UploadTimeSelectProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const UploadTimeSelect = ({
  value,
  onChange,
  placeholder = "Select upload time",
  disabled,
  className,
  labelClassName,
  inputClassName,
}: UploadTimeSelectProps) => {
  return (
    <div className={cn(className)}>
      <Label className={cn(labelClassName)}>Upload Time</Label>
      <div className={inputClassName}>
        <DateTimePicker
          placeholder={placeholder}
          disabled={disabled}
          granularity="day"
          value={value}
          onChange={onChange}
          className={cn("w-full rounded-full !bg-transparent")}
        />
      </div>
    </div>
  );
};
export default UploadTimeSelect;
