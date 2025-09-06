import MediaList from "@/app/(main)/components/MediaList";
import { Album, Artist, Track } from "@/app/types/model";
import SimpleTrackTable from "@/components/common/SimpleTrackTable";

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
    </div>
  );
};
export default SearchResult;
