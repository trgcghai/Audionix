import useAdminTrackManagement from "@/app/(admin)/hooks/useAdminTrackManagement";
import { DEFAULT_GENRES, TRACK_STATUS_OPTIONS } from "@/app/constant";
import ErrorMessage from "@/components/common/ErrorMessage";
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
    albums,
    setAlbumsFilter,
    status,
    setStatusFilter,
    genres,
    setGenresFilter,
    clearFilter,
    albumOptions,
  } = useAdminTrackManagement();
  return (
    <>
      <div className={cn("", className)}>
        <TitleFilter
          value={debounceTitle}
          onChange={setTitleFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName, "w-1/8")}
          title="Track Title"
        />

        <MultipleValueFilter
          options={albumOptions}
          label="Albums"
          placeholder="Select albums"
          value={albums}
          onChange={setAlbumsFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
          creatable={false}
          emptyIndicator={
            <div className="flex items-center justify-center">
              <ErrorMessage
                message="No albums found."
                severity="info"
                variant="inline"
                showIcon={false}
              />
            </div>
          }
        />

        <MultipleValueFilter
          options={TRACK_STATUS_OPTIONS.map((status) => ({
            label: status.label,
            value: status.value,
          }))}
          label="Status"
          placeholder="Select status"
          value={status}
          onChange={setStatusFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
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
          creatable
        />
      </div>
      <Button className="rounded-full" size={"sm"} onClick={clearFilter}>
        Clear Filters
      </Button>
    </>
  );
};
export default TableFilters;
