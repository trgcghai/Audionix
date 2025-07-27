import { TrackItem } from "@/app/types/component";
import TrackRow from "@/components/common/TrackRow";
import { Table, TableBody } from "@/components/ui/table";

const RecommendationsTracks = ({ mockTracks }: { mockTracks: TrackItem[] }) => {
  return (
    <div className="mx-0.5 mt-8">
      <p className="text-xl font-bold">Recommendations</p>
      <Table className="mt-4">
        <TableBody className="">
          {mockTracks.map((track, index) => (
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
export default RecommendationsTracks;
