import { Columns } from "@/app/_components/DataTable/TrackTable/Columns";
import { TrackTable } from "@/app/_components/DataTable/TrackTable/Table";
import { mockArtistTracks } from "@/app/sampleData";
import { ScrollArea } from "@/components/ui/scroll-area";

const TracksPage = () => {
  return (
    <ScrollArea className="px-3">
      <p className="text-xl font-bold mb-4">Your tracks</p>

      <TrackTable
        columns={Columns}
        data={[
          ...mockArtistTracks,
          ...mockArtistTracks,
          ...mockArtistTracks,
          ...mockArtistTracks,
          ...mockArtistTracks,
          ...mockArtistTracks,
          ...mockArtistTracks,
        ].slice(0, 27)}
      />
    </ScrollArea>
  );
};
export default TracksPage;
