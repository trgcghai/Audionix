import useTrackManagement from "@/app/(artist-portal)/artist-tracks/hooks/useTrackManagement";
import { DEFAULT_GENRES, TrackStatusValues } from "@/app/constant";
import { mockAlbums } from "@/app/sampleData";
import MultipleValueFilter from "@/components/common/filters/MultipleValueFilter";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import TitleFilter from "../../../../../../components/common/filters/TitleFilter";

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
  } = useTrackManagement();
  return (
    <>
      <div className={cn("space-y-4", className)}>
        <TitleFilter
          value={debounceTitle}
          onChange={setTitleFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
        />

        <MultipleValueFilter
          options={mockAlbums.map((album) => ({
            label: album.name,
            value: album._id,
          }))}
          label="Albums"
          placeholder="Select albums"
          value={albums}
          onChange={setAlbumsFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
        />

        <MultipleValueFilter
          options={TrackStatusValues.map((status) => ({
            label: status.label,
            value: status.value,
          }))}
          label="Status"
          placeholder="Select status"
          value={status}
          onChange={setStatusFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName, "w-28")}
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
      </div>
      <Button className="rounded-full" size={"sm"} onClick={clearFilter}>
        Clear Filters
      </Button>
    </>
  );
};
export default TableFilters;
