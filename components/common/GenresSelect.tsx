import { DEFAULT_GENRES } from "@/app/constant";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { cn } from "@/libs/utils";

interface GenresSelectProps {
  value: Option[];
  onChange: (e: Option[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const GenresSelect = ({
  value,
  onChange,
  placeholder = "Select genres",
  disabled,
  className,
  labelClassName,
  inputClassName,
}: GenresSelectProps) => {
  return (
    <div className={cn(className)}>
      <Label className={cn(labelClassName, "w-28")}>Genres</Label>
      <MultipleSelector
        options={DEFAULT_GENRES.map((genre) => ({
          label: genre.label,
          value: genre.value,
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
export default GenresSelect;
