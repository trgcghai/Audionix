import useTrackManagement from "@/app/(artist-portal)/artist-tracks/hooks/useTrackManagement";
import { DEFAULT_GENRES, TrackStatusValues } from "@/app/constant";
import { mockAlbums } from "@/app/sampleData";
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
  } = useTrackManagement();
  return (
    <>
      <div className={cn("", className)}>
        <TitleFilter
          value={debounceTitle}
          onChange={setTitleFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName, "w-1/8")}
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
        />
      </div>
      <Button className="rounded-full" size={"sm"} onClick={clearFilter}>
        Clear Filters
      </Button>
    </>
  );
};
export default TableFilters;
