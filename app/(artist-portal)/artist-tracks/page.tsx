"use client";
import { Columns } from "@/app/(artist-portal)/artist-tracks/components/table/Columns";
import { TrackTable } from "@/app/(artist-portal)/artist-tracks/components/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTrackManagement from "@/services/tracks/useTrackManagement";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { ApiErrorResponse } from "@/app/types/api";

const ArtistTrackPage = () => {
  const { tracks, isLoading, isError, error } = useTrackManagement();

  return (
    <ScrollArea className="px-3">
      <p className="mb-4 text-xl font-bold">Your tracks</p>

      {isLoading && <LoaderSpin fullScreen />}
      {isError && (
        <ErrorMessage
          message={
            (error as ApiErrorResponse)?.message ||
            "An error occurred while fetching tracks data. Please try again later"
          }
        />
      )}

      <TrackTable columns={Columns} data={tracks} />
    </ScrollArea>
  );
};
export default ArtistTrackPage;
