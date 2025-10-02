"use client";

import useAdminAccountManagement from "@/app/(admin)/hooks/useAdminAccountManagement";
import { ROLE_OPTIONS } from "@/app/constant";
import MultipleValueFilter from "@/components/common/filters/MultipleValueFilter";
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
  const { debounceEmail, setEmailFilter, clearFilter, roles, setRolesFilter } =
    useAdminAccountManagement();

  return (
    <>
      <div className={className}>
        <TitleFilter
          value={debounceEmail}
          onChange={setEmailFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
          title="Email"
          placeholder="Search by email..."
        />
        <MultipleValueFilter
          options={ROLE_OPTIONS}
          label="Roles"
          placeholder="Select roles"
          value={roles}
          onChange={setRolesFilter}
          creatable={false}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
        />
      </div>
      <Button className="rounded-full" size={"sm"} onClick={clearFilter}>
        Clear Filters
      </Button>
    </>
  );
};

export default TableFilters;
