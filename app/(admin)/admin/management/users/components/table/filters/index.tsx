import useAdminUserManagement from "@/app/(admin)/hooks/useAdminUserManagement";
import TitleFilter from "@/components/common/filters/TitleFilter";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";

interface TableFiltersProps {
  className?: string;
  itemClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const TableFilters = ({
  className,
  itemClassName,
  inputClassName,
  labelClassName,
}: TableFiltersProps) => {
  const {
    clearFilter,
    debounceUsername,
    setUsernameFilter,
    debounceEmail,
    setEmailFilter,
  } = useAdminUserManagement();
  return (
    <>
      <div className={cn("", className)}>
        <TitleFilter
          value={debounceUsername}
          onChange={setUsernameFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName, "w-1/8")}
          title="Username"
        />

        <TitleFilter
          value={debounceEmail}
          onChange={setEmailFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName, "w-1/8")}
          title="Email"
        />
      </div>
      <Button className="rounded-full" size={"sm"} onClick={clearFilter}>
        Clear Filters
      </Button>
    </>
  );
};
export default TableFilters;
