import SimpleTrackTable from "@/components/common/SimpleTrackTable";
import { Track } from "@/app/types/model";

const SearchResult = ({
  searchTerm,
  searchResults,
}: {
  searchTerm: string;
  searchResults: Track[];
}) => {
  if (searchResults.length === 0) {
    return (
      <div className="mt-4">
        <p className="mb-2 text-lg font-semibold">
          Search results for {searchTerm}
        </p>
        <p className="text-gray-500">
          No results found. Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="mb-2 text-lg font-semibold">
        Search results for {searchTerm}
      </p>
      <SimpleTrackTable
        tracks={searchResults}
        showHeader={false}
        variant="addToPlaylist"
      />
    </div>
  );
};
export default SearchResult;
