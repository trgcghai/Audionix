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

  // multiple select props
  creatable?: boolean;
  emptyIndicator?: React.ReactNode;
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
  creatable = false,
  emptyIndicator,
}: MultipleValueFilterProps) => {
  return (
    <div className={cn(className)}>
      <Label className={cn(labelClassName)}>{label}</Label>
      <MultipleSelector
        creatable={creatable}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(inputClassName)}
        emptyIndicator={emptyIndicator}
      />
    </div>
  );
};
export default MultipleValueFilter;
