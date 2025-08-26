import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { cn } from "@/libs/utils";

interface MultipleValueFilterProps {
  // The options to choose from
  options: Option[];

  // Values and onChange handler
  value: Option[];
  onChange: (e: Option[]) => void;

  // Input props
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const MultipleValueFilter = ({
  options,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  className,
  labelClassName,
  inputClassName,
}: MultipleValueFilterProps) => {
  return (
    <div className={cn(className)}>
      <Label className={cn(labelClassName)}>{label}</Label>
      <MultipleSelector
        creatable
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(inputClassName)}
      />
    </div>
  );
};
export default MultipleValueFilter;
