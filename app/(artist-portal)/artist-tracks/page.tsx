import { Columns } from "@/app/(artist-portal)/artist-tracks/components/table/Columns";
import { TrackTable } from "@/app/(artist-portal)/artist-tracks/components/table";
import { mockArtistTracks } from "@/app/sampleData";
import { ScrollArea } from "@/components/ui/scroll-area";

const ArtistTrackPage = () => {
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
export default ArtistTrackPage;
