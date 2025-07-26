import TableTrack from "@/components/common/SimpleTrackTable";
import MediaList from "@/components/common/MediaList";
import { mockTracks, mockAlbums } from "@/app/sampleData";

const ArtistPortalPage = () => {
  return (
    <div>
      <div className="">
        <p className="text-xl font-bold px-2">Your latest tracks</p>
        <TableTrack
          tracks={mockTracks.slice(0, 5)}
          showHeader={false}
          variant="artistTrack"
        />
      </div>

      <div className="mt-8">
        <MediaList data={mockAlbums} title="New released albums" />
      </div>
    </div>
  );
};
export default ArtistPortalPage;
