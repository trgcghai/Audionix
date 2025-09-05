import MediaList from "@/app/(main)/components/MediaList";
import { Album, Artist, Track } from "@/app/types/model";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SearchResultProps<T> {
  type: string;
  data: T[];
}

const SearchResult = <T,>({ type, data }: SearchResultProps<T>) => {
  return (
    <div className="mt-4 px-3">
      {type === "tracks" && <SimpleTrackTable tracks={data as Track[]} />}
      {type === "artists" && <MediaList data={data as Artist[]} />}
      {type === "albums" && <MediaList data={data as Album[]} />}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default SearchResult;
