import { TrackItem } from "@/app/types/component";
import { Table, TableBody } from "@/components/ui/table";
import TrackRow from "../../../../components/common/TrackRow";

const SearchResult = ({
  searchTerm,
  searchResults,
}: {
  searchTerm: string;
  searchResults: TrackItem[];
}) => {
  if (searchResults.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-lg font-semibold mb-2">
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
      <p className="text-lg font-semibold mb-2">
        Search results for {searchTerm}
      </p>
      <Table>
        <TableBody>
          {searchResults.map((track, index) => (
            <TrackRow
              key={track.id + index}
              track={track}
              index={index + 1}
              variant="addToPlaylist"
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default SearchResult;
