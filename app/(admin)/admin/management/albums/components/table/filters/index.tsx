import useAdminAlbumManagement from "@/app/(admin)/hooks/useAdminAlbumManagement";
import { ALBUM_STATUS_OPTIONS, DEFAULT_GENRES } from "@/app/constant";
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
  const {
    debounceTitle,
    setTitleFilter,
    status,
    setStatusFilter,
    genres,
    setGenresFilter,
    clearFilter,
  } = useAdminAlbumManagement();
  return (
    <>
      <div className={cn("space-y-4", className)}>
        <TitleFilter
          value={debounceTitle}
          onChange={setTitleFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
          title="Album Title"
        />
        <MultipleValueFilter
          options={DEFAULT_GENRES.map((genre) => ({
            label: genre.label,
            value: genre.value,
          }))}
          label="Genres"
          placeholder="Select genres"
          value={genres}
          onChange={setGenresFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
        />
        <MultipleValueFilter
          options={ALBUM_STATUS_OPTIONS.map((status) => ({
            label: status.label,
            value: status.value,
          }))}
          label="Status"
          placeholder="Select album status"
          value={status}
          onChange={setStatusFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName, "w-28")}
        />
      </div>
      <Button className="rounded-full" size={"sm"} onClick={clearFilter}>
        Clear Filters
      </Button>
    </>
  );
};
export default TableFilters;
