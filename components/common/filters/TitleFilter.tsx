import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";

interface TitleFilterProps {
  value: string;
  onChange: (e: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  title: string;
}

const TitleFilter = ({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  className = "",
  labelClassName = "",
  inputClassName = "",
  title,
}: TitleFilterProps) => {
  return (
    <div className={cn(className)}>
      <Label className={cn(labelClassName)}>{title}</Label>
      <Input
        className={cn("!bg-transparent", inputClassName)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
export default TitleFilter;
