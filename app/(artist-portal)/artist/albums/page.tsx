"use client";
import DetailAlbumDialog from "@/app/(artist-portal)/artist/albums/components/DetailAlbumDialog";
import AlbumTable from "@/app/(artist-portal)/artist/albums/components/table";
import { Columns } from "@/app/(artist-portal)/artist/albums/components/table/Columns";
import useAlbumManagement from "@/app/(artist-portal)/artist/albums/hooks/useAlbumManagement";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideViewDetail,
  useDetailAlbumSlice,
} from "@/store/slices/detailAlbumSlice";
import { useEffect } from "react";

const ArtistAlbumPage = () => {
  const { album } = useDetailAlbumSlice();
  const dispatch = useAppDispatch();
  const { albums, getAlbumState } = useAlbumManagement();

  useEffect(() => {
    return () => {
      dispatch(hideViewDetail());
    };
  }, [dispatch]);

  return (
    <div className="h-full px-3">
      <div className="flex items-start gap-10">
        <div className="w-full">
          <p className="mb-4 text-xl font-bold">Your albums</p>

          {getAlbumState.isLoading && <LoaderSpin fullScreen />}
          {getAlbumState.isError && (
            <ErrorMessage
              message={
                (getAlbumState.error as ApiErrorResponse)?.data?.message ||
                "An error occurred while fetching album data. Please try again later"
              }
            />
          )}
          {getAlbumState.isSuccess && (
            <AlbumTable columns={Columns} data={albums} />
          )}
        </div>

        {album && <DetailAlbumDialog />}
      </div>
    </div>
  );
};
export default ArtistAlbumPage;
