"use client";
import DetailTrackDialog from "@/app/(artist-portal)/artist/tracks/components/DetailTrackDialog";
import { TrackTable } from "@/app/(artist-portal)/artist/tracks/components/table";
import { BaseTrackColumns } from "@/app/(artist-portal)/artist/tracks/components/table/Columns";
import useTrackManagement from "@/app/(artist-portal)/artist/tracks/hooks/useTrackManagement";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useAppDispatch } from "@/hooks/redux";
import { setOpen, useDetailTrackSlice } from "@/store/slices/detailTrackSlice";

const ArtistTrackPage = () => {
  const { tracks, isLoading, isError, error } = useTrackManagement();
  const { isOpen, track } = useDetailTrackSlice();
  const dispatch = useAppDispatch();

  const setIsOpen = (isOpen: boolean) => {
    dispatch(setOpen({ isOpen }));
  };

  return (
    <div className="px-3">
      <p className="mb-4 text-xl font-bold">Your tracks</p>

      {isLoading && <LoaderSpin fullScreen />}
      {isError && (
        <ErrorMessage
          message={
            (error as ApiErrorResponse)?.data?.message ||
            "An error occurred while fetching tracks data. Please try again later"
          }
        />
      )}

      <TrackTable columns={BaseTrackColumns} data={tracks} />

      {track && (
        <DetailTrackDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          track={track}
        />
      )}
    </div>
  );
};
export default ArtistTrackPage;
