import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/libs/utils";
import { useEffect, useState } from "react";

interface TitleFilterProps {
  value: string;
  onChange: (e: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const TitleFilter = ({
  value,
  onChange,
  placeholder = "Search by track title",
  disabled = false,
  className = "",
  labelClassName = "",
  inputClassName = "",
}: TitleFilterProps) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 500);

  // Khi người dùng nhập, cập nhật local state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Khi giá trị debounced thay đổi, trigger onChange để cập nhật filter
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  // Đồng bộ với external value nếu nó thay đổi từ bên ngoài
  useEffect(() => {
    if (value !== inputValue && value === "") {
      setInputValue("");
    }
  }, [inputValue, value]);

  return (
    <div className={cn("mb-4 flex items-center gap-2", className)}>
      <Label className={cn("capitalize", labelClassName)}>Track title</Label>
      <Input
        className={cn("w-sm rounded-full", inputClassName)}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
export default TitleFilter;
