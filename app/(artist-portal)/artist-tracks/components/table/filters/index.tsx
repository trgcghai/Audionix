import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import useTrackManagement from "@/app/(artist-portal)/artist-tracks/hooks/useTrackManagement";
import AlbumsSelect from "./AlbumsSelect";
import StatusFilter from "./StatusFilter";
import TitleFilter from "./TitleFilter";
import UploadTimeSelect from "./UploadTimeSelect";

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
    title,
    setTitleFilter,
    albums,
    setAlbumsFilter,
    uploadTime,
    setUploadTimeFilter,
    status,
    setStatusFilter,
    clearFilter,
  } = useTrackManagement();
  return (
    <>
      <div className={cn("space-y-4", className)}>
        <TitleFilter
          value={title}
          onChange={setTitleFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
        />

        <AlbumsSelect
          value={albums}
          onChange={setAlbumsFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
        />

        <UploadTimeSelect
          value={uploadTime}
          onChange={setUploadTimeFilter}
          className={cn(itemClassName)}
          inputClassName={cn(inputClassName)}
          labelClassName={cn(labelClassName)}
        />

        <StatusFilter
          value={status}
          onChange={setStatusFilter}
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
