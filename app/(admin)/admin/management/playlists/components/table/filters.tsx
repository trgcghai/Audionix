"use client";

import useAdminPlaylistManagement from "@/app/(admin)/hooks/useAdminPlaylistManagement";
import MultipleValueFilter from "@/components/common/filters/MultipleValueFilter";
import TitleFilter from "@/components/common/filters/TitleFilter";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { useGetUsersAsOptionsQuery } from "@/services/users/userApi";

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
    debounceTitle,
    setTitleFilter,
    clearFilter,
    owners,
    setOwnersFilter,
  } = useAdminPlaylistManagement();

  const { data } = useGetUsersAsOptionsQuery();

  return (
    <>
      <div className={className}>
        <TitleFilter
          value={debounceTitle}
          onChange={setTitleFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
          title="Playlist Title"
        />
        <MultipleValueFilter
          options={data?.data.items || []}
          label="Owner"
          placeholder="Select owners"
          value={owners}
          onChange={setOwnersFilter}
          creatable={false}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
          emptyIndicator={
            <div className="text-muted-foreground">No owners found</div>
          }
        />
      </div>
      <Button className="rounded-full" size={"sm"} onClick={clearFilter}>
        Clear Filters
      </Button>
    </>
  );
};

export default TableFilters;
