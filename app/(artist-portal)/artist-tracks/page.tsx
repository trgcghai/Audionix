"use client";
import { TrackTable } from "@/app/(artist-portal)/artist-tracks/components/table";
import { Columns } from "@/app/(artist-portal)/artist-tracks/components/table/Columns";
import useTrackManagement from "@/app/(artist-portal)/artist-tracks/hooks/useTrackManagement";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";

const ArtistTrackPage = () => {
  const { tracks, isLoading, isError, error } = useTrackManagement();

  return (
    <div className="px-3">
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
    </div>
  );
};
export default ArtistTrackPage;
