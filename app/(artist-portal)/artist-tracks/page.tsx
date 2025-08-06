"use client";
import { Columns } from "@/app/(artist-portal)/artist-tracks/components/table/Columns";
import { TrackTable } from "@/app/(artist-portal)/artist-tracks/components/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTrackManagement from "@/services/tracks/useTrackManagement";

const ArtistTrackPage = () => {
  const { tracks } = useTrackManagement();

  return (
    <ScrollArea className="px-3">
      <p className="mb-4 text-xl font-bold">Your tracks</p>

      <TrackTable columns={Columns} data={tracks} />
    </ScrollArea>
  );
};
export default ArtistTrackPage;
